
import { useRef, useCallback, useEffect, useState } from "react";

interface VoiceAssistantOptions {
  onTranscript?: (text: string) => void;
  lang?: string;
  ttsVoiceName?: string; // Optionally select a voice by name
}

interface UseVoiceAssistantResult {
  isSupported: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  cancelSpeak: () => void;
  setTranscript: (val: string) => void;
}

// Browser SpeechRecognition/polyfill
const SpeechRecognition: any =
  (window as any).SpeechRecognition ||
  (window as any).webkitSpeechRecognition ||
  null;

// Browser SpeechSynthesis
const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

export function useVoiceAssistant(options: VoiceAssistantOptions = {}): UseVoiceAssistantResult {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.lang = options.lang || "en-US";
    rec.interimResults = false;
    rec.continuous = false;

    rec.onresult = (event: any) => {
      const text = event.results?.[0]?.[0]?.transcript ?? "";
      setTranscript(text);
      options.onTranscript?.(text);
      setIsListening(false);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);

    recognitionRef.current = rec;
    // Cleanup
    return () => rec.abort();
    // eslint-disable-next-line
  }, [options.lang, options.onTranscript]);

  const startListening = useCallback(() => {
    if (!SpeechRecognition || isListening) return;
    setTranscript("");
    setIsListening(true);
    try { recognitionRef.current?.start(); } catch {}
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (!SpeechRecognition) return;
    setIsListening(false);
    recognitionRef.current?.stop?.();
  }, []);

  // Speech Synthesis (TTS)
  const speak = useCallback(
    (text: string) => {
      if (!synth) return;
      if (isSpeaking) return;
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.volume = 1;
      utter.rate = 1;
      utter.pitch = 1;
      utter.lang = options.lang || "en-US";

      // Choose a specific voice if set
      if (options.ttsVoiceName) {
        const voice = synth.getVoices().find(v => v.name === options.ttsVoiceName);
        if (voice) utter.voice = voice;
      }
      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utter;
      synth.speak(utter);
    },
    [isSpeaking, options.lang, options.ttsVoiceName]
  );

  const cancelSpeak = useCallback(() => {
    if (synth && isSpeaking) {
      synth.cancel();
    }
    setIsSpeaking(false);
  }, [isSpeaking]);

  return {
    isSupported: Boolean(SpeechRecognition && synth),
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    speak,
    cancelSpeak,
    setTranscript,
  };
}
