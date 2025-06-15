
import { useRef, useCallback, useEffect, useState } from "react";

interface VoiceAssistantOptions {
  onTranscript?: (text: string) => void;
  onError?: (error: string) => void;
  lang?: string;
  ttsVoiceName?: string;
}

interface UseVoiceAssistantResult {
  isSupported: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  cancelSpeak: () => void;
  setTranscript: (val: string) => void;
  clearError: () => void;
}

// Browser compatibility checks
const SpeechRecognition: any =
  typeof window !== 'undefined' && (
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition ||
    null
  );

const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

// Check if running on mobile (iOS Safari has limited support)
const isMobile = typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);
const isIOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

export function useVoiceAssistant(options: VoiceAssistantOptions = {}): UseVoiceAssistantResult {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check browser support
  const isSupported = Boolean(SpeechRecognition && synth);

  // Initialize speech recognition with better error handling
  useEffect(() => {
    if (!SpeechRecognition || !isSupported) return;

    try {
      const rec = new SpeechRecognition();
      rec.lang = options.lang || "en-US";
      rec.interimResults = false;
      rec.continuous = false;
      rec.maxAlternatives = 1;

      // Add timeout for recognition
      rec.onstart = () => {
        setError(null);
        timeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setError("Speech recognition timed out. Please try again.");
          }
        }, 10000); // 10 second timeout
      };

      rec.onresult = (event: any) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        const text = event.results?.[0]?.[0]?.transcript ?? "";
        if (text.trim()) {
          setTranscript(text);
          options.onTranscript?.(text);
        }
        setIsListening(false);
      };

      rec.onerror = (event: any) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        const errorMessage = getRecognitionErrorMessage(event.error);
        setError(errorMessage);
        options.onError?.(errorMessage);
        setIsListening(false);
      };

      rec.onend = () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setIsListening(false);
      };

      recognitionRef.current = rec;
    } catch (err) {
      setError("Failed to initialize speech recognition");
      options.onError?.("Failed to initialize speech recognition");
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [options.lang, isSupported]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      const msg = "Speech recognition is not supported in this browser";
      setError(msg);
      options.onError?.(msg);
      return;
    }

    if (isListening || !recognitionRef.current) return;

    // Request microphone permissions on mobile
    if (isMobile || isIOS) {
      navigator.mediaDevices?.getUserMedia({ audio: true })
        .then(() => {
          setTranscript("");
          setError(null);
          setIsListening(true);
          try {
            recognitionRef.current?.start();
          } catch (err) {
            setError("Failed to start speech recognition");
            setIsListening(false);
          }
        })
        .catch(() => {
          setError("Microphone permission denied");
          options.onError?.("Microphone permission denied");
        });
    } else {
      setTranscript("");
      setError(null);
      setIsListening(true);
      try {
        recognitionRef.current?.start();
      } catch (err) {
        setError("Failed to start speech recognition");
        setIsListening(false);
      }
    }
  }, [isListening, isSupported, options]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    setIsListening(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    try {
      recognitionRef.current.stop();
    } catch (err) {
      // Ignore stop errors
    }
  }, []);

  // Enhanced speech synthesis
  const speak = useCallback((text: string) => {
    if (!synth || !isSupported) {
      const msg = "Text-to-speech is not supported in this browser";
      setError(msg);
      options.onError?.(msg);
      return;
    }

    if (isSpeaking) return;

    try {
      // Cancel any existing speech
      synth.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      utter.volume = 1;
      utter.rate = 1;
      utter.pitch = 1;
      utter.lang = options.lang || "en-US";

      // Try to use specified voice
      if (options.ttsVoiceName) {
        const voices = synth.getVoices();
        const voice = voices.find(v => v.name === options.ttsVoiceName);
        if (voice) utter.voice = voice;
      }

      utter.onstart = () => {
        setIsSpeaking(true);
        setError(null);
      };
      
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = (event) => {
        setIsSpeaking(false);
        const msg = `Speech synthesis error: ${event.error}`;
        setError(msg);
        options.onError?.(msg);
      };

      utteranceRef.current = utter;
      synth.speak(utter);
    } catch (err) {
      setError("Failed to start text-to-speech");
      setIsSpeaking(false);
    }
  }, [isSpeaking, options, isSupported]);

  const cancelSpeak = useCallback(() => {
    if (synth && isSpeaking) {
      synth.cancel();
    }
    setIsSpeaking(false);
  }, [isSpeaking]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isSupported,
    isListening,
    isSpeaking,
    transcript,
    error,
    startListening,
    stopListening,
    speak,
    cancelSpeak,
    setTranscript,
    clearError,
  };
}

// Helper function to provide user-friendly error messages
function getRecognitionErrorMessage(error: string): string {
  switch (error) {
    case 'network':
      return 'Network error occurred during speech recognition';
    case 'not-allowed':
      return 'Microphone access denied. Please enable microphone permissions.';
    case 'no-speech':
      return 'No speech detected. Please try speaking again.';
    case 'aborted':
      return 'Speech recognition was cancelled';
    case 'audio-capture':
      return 'No microphone found or audio capture failed';
    case 'service-not-allowed':
      return 'Speech recognition service is not allowed';
    default:
      return `Speech recognition error: ${error}`;
  }
}
