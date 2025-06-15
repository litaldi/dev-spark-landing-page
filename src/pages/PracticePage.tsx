
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConsolidatedLayout } from '@/components/layout/ConsolidatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, RotateCcw, CheckCircle, AlertCircle, User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  clientType: string;
  objective: string;
  context: string;
}

const scenarios: Scenario[] = [
  {
    id: 'cold-call-1',
    title: 'Cold Call - Software Demo',
    description: 'Call a busy IT manager to schedule a software demonstration',
    difficulty: 'Beginner',
    clientType: 'Busy Executive',
    objective: 'Schedule a 30-minute demo call',
    context: 'You are calling ABC Corp\'s IT Manager who has never heard of your company. They are known to be very direct and value efficiency.'
  },
  {
    id: 'objection-handling-1',
    title: 'Price Objection Handling',
    description: 'Handle price concerns from a cost-conscious buyer',
    difficulty: 'Intermediate',
    clientType: 'Budget-Conscious Buyer',
    objective: 'Demonstrate value and move to trial',
    context: 'The prospect loves your solution but is concerned about the price. They have a limited budget and need to justify the ROI.'
  },
  {
    id: 'closing-1',
    title: 'Contract Negotiation',
    description: 'Close a deal with a skeptical decision maker',
    difficulty: 'Advanced',
    clientType: 'Skeptical Decision Maker',
    objective: 'Close the deal with favorable terms',
    context: 'You are in final negotiations. The client likes your solution but has concerns about implementation timeline and support.'
  }
];

const PracticePage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [conversation, setConversation] = useState<Array<{
    speaker: 'user' | 'ai';
    message: string;
    timestamp: Date;
  }>>([]);
  const [sessionStats, setSessionStats] = useState({
    wordsSpoken: 0,
    averageResponseTime: 0,
    confidenceScore: 0,
    keyPointsCovered: 0
  });

  const { toast } = useToast();
  const sessionTimerRef = useRef<NodeJS.Timeout>();
  const [sessionDuration, setSessionDuration] = useState(0);

  const {
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
    clearError
  } = useVoiceAssistant({
    onTranscript: handleUserSpeech,
    onError: (error) => {
      toast({
        title: "Voice Assistant Error",
        description: error,
        variant: "destructive"
      });
    }
  });

  // Handle user speech input
  function handleUserSpeech(text: string) {
    if (!selectedScenario || !isSessionActive) return;

    const newMessage = {
      speaker: 'user' as const,
      message: text,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, newMessage]);
    setSessionStats(prev => ({
      ...prev,
      wordsSpoken: prev.wordsSpoken + text.split(' ').length
    }));

    // Simulate AI response (in production, this would call your AI service)
    setTimeout(() => {
      generateAIResponse(text);
    }, 1000 + Math.random() * 2000); // Realistic response delay
  }

  // Generate AI response based on scenario and user input
  const generateAIResponse = useCallback((userInput: string) => {
    if (!selectedScenario) return;

    // Simple response generation (in production, use proper AI service)
    const responses = getContextualResponses(selectedScenario.clientType, userInput.toLowerCase());
    const response = responses[Math.floor(Math.random() * responses.length)];

    const aiMessage = {
      speaker: 'ai' as const,
      message: response,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, aiMessage]);
    
    // Speak the AI response
    speak(response);

    // Update progress (simple logic - in production, use proper assessment)
    setSessionProgress(prev => Math.min(prev + 15, 100));
  }, [selectedScenario, speak]);

  // Start practice session
  const startSession = useCallback((scenario: Scenario) => {
    if (!isSupported) {
      toast({
        title: "Voice Not Supported",
        description: "Your browser doesn't support voice features. Please use Chrome, Firefox, or Safari.",
        variant: "destructive"
      });
      return;
    }

    setSelectedScenario(scenario);
    setIsSessionActive(true);
    setConversation([]);
    setSessionProgress(0);
    setSessionDuration(0);
    clearError();

    // Start session timer
    sessionTimerRef.current = setInterval(() => {
      setSessionDuration(prev => prev + 1);
    }, 1000);

    // Welcome message
    const welcomeMessage = `Welcome to the ${scenario.title} practice session. ${scenario.context} I'll be playing the role of ${scenario.clientType}. You can start the conversation whenever you're ready.`;
    
    setConversation([{
      speaker: 'ai',
      message: welcomeMessage,
      timestamp: new Date()
    }]);

    speak(welcomeMessage);

    toast({
      title: "Session Started",
      description: `Practice session for "${scenario.title}" has begun.`
    });
  }, [isSupported, speak, clearError, toast]);

  // End practice session
  const endSession = useCallback(() => {
    setIsSessionActive(false);
    stopListening();
    cancelSpeak();
    
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
    }

    // Calculate final stats
    const finalStats = {
      duration: sessionDuration,
      wordsSpoken: sessionStats.wordsSpoken,
      messagesExchanged: conversation.length,
      completionPercentage: sessionProgress
    };

    toast({
      title: "Session Complete",
      description: `You practiced for ${Math.floor(sessionDuration / 60)}:${(sessionDuration % 60).toString().padStart(2, '0')} and spoke ${finalStats.wordsSpoken} words.`
    });
  }, [sessionDuration, sessionStats.wordsSpoken, conversation.length, sessionProgress, stopListening, cancelSpeak, toast]);

  // Reset current session
  const resetSession = useCallback(() => {
    if (selectedScenario) {
      startSession(selectedScenario);
    }
  }, [selectedScenario, startSession]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
      }
    };
  }, []);

  // Format session duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isSupported) {
    return (
      <ConsolidatedLayout
        title="Practice Sessions - VoiceSeller"
        description="Practice sales conversations with AI"
        variant="default"
      >
        <div className="container mx-auto px-4 py-8">
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Voice features are not supported in your current browser. Please use Chrome, Firefox, or Safari for the full experience.
            </AlertDescription>
          </Alert>
        </div>
      </ConsolidatedLayout>
    );
  }

  return (
    <ConsolidatedLayout
      title="Practice Sessions - VoiceSeller"
      description="Practice sales conversations with AI"
      variant="default"
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Practice Sessions</h1>
          <p className="text-muted-foreground">
            Choose a scenario and practice your sales conversations with AI-powered client simulations.
          </p>
        </div>

        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              {error}
              <Button variant="ghost" size="sm" onClick={clearError}>
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scenario Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Practice Scenarios
                </CardTitle>
                <CardDescription>
                  Select a scenario to begin practicing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {scenarios.map((scenario) => (
                  <Card 
                    key={scenario.id} 
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md",
                      selectedScenario?.id === scenario.id && "ring-2 ring-primary"
                    )}
                    onClick={() => !isSessionActive && startSession(scenario)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{scenario.title}</h3>
                        <Badge variant={
                          scenario.difficulty === 'Beginner' ? 'default' :
                          scenario.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
                        }>
                          {scenario.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {scenario.description}
                      </p>
                      <div className="text-xs">
                        <span className="font-medium">Client: </span>
                        <span className="text-muted-foreground">{scenario.clientType}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Practice Session */}
          <div className="lg:col-span-2">
            {!isSessionActive ? (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Mic className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ready to Practice?</h3>
                  <p className="text-muted-foreground">
                    Select a scenario from the left to begin your practice session.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Session Header */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{selectedScenario?.title}</CardTitle>
                        <CardDescription>
                          <strong>Objective:</strong> {selectedScenario?.objective}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="text-lg font-mono">{formatDuration(sessionDuration)}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{sessionProgress}%</span>
                      </div>
                      <Progress value={sessionProgress} />
                    </div>
                  </CardHeader>
                </Card>

                {/* Conversation */}
                <Card className="flex-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Conversation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                      <AnimatePresence>
                        {conversation.map((message, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              "flex gap-3",
                              message.speaker === 'user' ? "justify-end" : "justify-start"
                            )}
                          >
                            <div className={cn(
                              "flex gap-2 max-w-[80%]",
                              message.speaker === 'user' ? "flex-row-reverse" : "flex-row"
                            )}>
                              <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm",
                                message.speaker === 'user' ? "bg-primary" : "bg-secondary"
                              )}>
                                {message.speaker === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                              </div>
                              <div className={cn(
                                "rounded-lg px-3 py-2 text-sm",
                                message.speaker === 'user' 
                                  ? "bg-primary text-primary-foreground" 
                                  : "bg-muted"
                              )}>
                                {message.message}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <Separator className="my-4" />

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={isListening ? "destructive" : "default"}
                          onClick={isListening ? stopListening : startListening}
                          disabled={isSpeaking}
                        >
                          {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                          {isListening ? "Stop Listening" : "Start Speaking"}
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={isSpeaking ? cancelSpeak : undefined}
                          disabled={!isSpeaking}
                        >
                          {isSpeaking ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                          {isSpeaking ? "Stop Speaking" : "AI Speaking"}
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={resetSession}>
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                        <Button size="sm" variant="outline" onClick={endSession}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          End Session
                        </Button>
                      </div>
                    </div>

                    {transcript && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">Recognized Speech:</div>
                        <div className="text-sm">{transcript}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </ConsolidatedLayout>
  );
};

// Helper function to generate contextual responses
function getContextualResponses(clientType: string, userInput: string): string[] {
  const responses: Record<string, string[]> = {
    'Busy Executive': [
      "I only have a few minutes. What can you do for me that I can't get elsewhere?",
      "I've heard this pitch before. How is this different?",
      "Time is money. Get to the point - what's the ROI?",
      "I'm already working with a vendor. Why should I switch?"
    ],
    'Budget-Conscious Buyer': [
      "That sounds expensive. What's the cheapest option?",
      "I need to see clear cost savings to justify this.",
      "Can we start with a smaller package or trial?",
      "How does this compare to your competitors' pricing?"
    ],
    'Skeptical Decision Maker': [
      "I've been burned by vendors before. How do I know this will work?",
      "What guarantees can you provide?",
      "Can you provide references from similar companies?",
      "What happens if this doesn't deliver the promised results?"
    ]
  };

  return responses[clientType] || [
    "That's interesting. Tell me more.",
    "I need to think about this.",
    "What would be the next steps?"
  ];
}

export default PracticePage;
