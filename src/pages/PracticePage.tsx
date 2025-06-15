
import React, { useState } from 'react';
import { ConsolidatedLayout } from '@/components/layout/ConsolidatedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Play, Square, Users, Briefcase, Phone, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { useToast } from '@/hooks/use-toast';

interface SalesScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  duration: string;
  icon: React.ComponentType<any>;
}

interface ClientPersonality {
  id: string;
  name: string;
  description: string;
  traits: string[];
}

const scenarios: SalesScenario[] = [
  {
    id: 'discovery',
    title: 'Discovery Call',
    description: 'Initial conversation to understand client needs and pain points',
    difficulty: 'beginner',
    duration: '10-15 min',
    icon: Users
  },
  {
    id: 'pitch',
    title: 'Product Pitch',
    description: 'Present your solution and demonstrate value proposition',
    difficulty: 'intermediate',
    duration: '15-20 min',
    icon: Briefcase
  },
  {
    id: 'objection',
    title: 'Objection Handling',
    description: 'Navigate client concerns and resistance professionally',
    difficulty: 'expert',
    duration: '10-15 min',
    icon: Target
  },
  {
    id: 'followup',
    title: 'Follow-up Call',
    description: 'Maintain engagement and move deals forward',
    difficulty: 'intermediate',
    duration: '8-12 min',
    icon: Phone
  }
];

const clientPersonalities: ClientPersonality[] = [
  {
    id: 'friendly',
    name: 'Friendly & Engaged',
    description: 'Warm, talkative, and interested in your solution',
    traits: ['Conversational', 'Asks questions', 'Positive attitude']
  },
  {
    id: 'skeptical',
    name: 'Skeptical & Cautious',
    description: 'Questioning, needs convincing, careful with decisions',
    traits: ['Analytical', 'Asks for proof', 'Risk-averse']
  },
  {
    id: 'formal',
    name: 'Professional & Direct',
    description: 'Business-focused, time-conscious, straight to the point',
    traits: ['Efficient', 'Results-oriented', 'No small talk']
  },
  {
    id: 'distracted',
    name: 'Busy & Distracted',
    description: 'Limited time, multitasking, needs quick value proposition',
    traits: ['Impatient', 'Multitasking', 'Time-pressed']
  }
];

export default function PracticePage() {
  const [selectedScenario, setSelectedScenario] = useState<SalesScenario | null>(null);
  const [selectedPersonality, setSelectedPersonality] = useState<ClientPersonality | null>(null);
  const [isInSession, setIsInSession] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const { toast } = useToast();

  const voiceAssistant = useVoiceAssistant({
    onTranscript: (text) => {
      console.log('User said:', text);
      // Here we'll later integrate with AI for client responses
    }
  });

  const startPracticeSession = () => {
    if (!selectedScenario || !selectedPersonality) {
      toast({
        title: "Setup Required",
        description: "Please select both a scenario and client personality to begin.",
        variant: "destructive"
      });
      return;
    }

    setIsInSession(true);
    setSessionStartTime(new Date());
    
    // Start the voice assistant
    voiceAssistant.speak(
      `Hello! I'm your client for today's ${selectedScenario.title.toLowerCase()}. ` +
      `I'll be playing the role of a ${selectedPersonality.name.toLowerCase()} client. ` +
      `Feel free to begin when you're ready!`
    );

    toast({
      title: "Practice Session Started",
      description: `${selectedScenario.title} with ${selectedPersonality.name} client`,
    });
  };

  const endPracticeSession = () => {
    setIsInSession(false);
    setSessionStartTime(null);
    voiceAssistant.cancelSpeak();
    
    toast({
      title: "Session Complete",
      description: "Great job! Check your feedback and analytics.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ConsolidatedLayout
      title="VoiceSeller Practice"
      description="Practice sales conversations with AI-powered client simulations"
      variant="minimal"
    >
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Sales Practice Studio
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Perfect your sales conversations with AI-powered client simulations and real-time feedback
          </p>
        </div>

        {!isInSession ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Scenario Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Choose Your Scenario
                </CardTitle>
                <CardDescription>
                  Select the type of sales conversation you want to practice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {scenarios.map((scenario) => {
                  const Icon = scenario.icon;
                  return (
                    <div
                      key={scenario.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                        selectedScenario?.id === scenario.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setSelectedScenario(scenario)}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 mt-1 text-primary" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{scenario.title}</h3>
                            <Badge className={getDifficultyColor(scenario.difficulty)}>
                              {scenario.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {scenario.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Duration: {scenario.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Client Personality Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Choose Client Personality
                </CardTitle>
                <CardDescription>
                  Select the type of client behavior you want to practice with
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {clientPersonalities.map((personality) => (
                  <div
                    key={personality.id}
                    className={cn(
                      "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                      selectedPersonality?.id === personality.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setSelectedPersonality(personality)}
                  >
                    <h3 className="font-medium mb-1">{personality.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {personality.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {personality.traits.map((trait) => (
                        <Badge key={trait} variant="secondary" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          // Active Practice Session
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                Live Practice Session
              </CardTitle>
              <CardDescription>
                {selectedScenario?.title} • {selectedPersonality?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl font-mono text-primary/70">
                  {sessionStartTime && (
                    <span>
                      {Math.floor((Date.now() - sessionStartTime.getTime()) / 60000).toString().padStart(2, '0')}:
                      {Math.floor(((Date.now() - sessionStartTime.getTime()) % 60000) / 1000).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    variant={voiceAssistant.isListening ? "destructive" : "default"}
                    onClick={voiceAssistant.isListening ? voiceAssistant.stopListening : voiceAssistant.startListening}
                    disabled={!voiceAssistant.isSupported}
                  >
                    {voiceAssistant.isListening ? (
                      <>
                        <MicOff className="h-5 w-5 mr-2" />
                        Stop Listening
                      </>
                    ) : (
                      <>
                        <Mic className="h-5 w-5 mr-2" />
                        Start Speaking
                      </>
                    )}
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={endPracticeSession}
                  >
                    <Square className="h-5 w-5 mr-2" />
                    End Session
                  </Button>
                </div>
              </div>

              {voiceAssistant.transcript && (
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Your last response:</h4>
                  <p className="text-sm">{voiceAssistant.transcript}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {!isInSession && (selectedScenario || selectedPersonality) && (
          <div className="text-center">
            <Button
              size="lg"
              onClick={startPracticeSession}
              disabled={!selectedScenario || !selectedPersonality || !voiceAssistant.isSupported}
            >
              <Play className="h-5 w-5 mr-2" />
              Start Practice Session
            </Button>
            {!voiceAssistant.isSupported && (
              <p className="text-sm text-muted-foreground mt-2">
                Voice features not supported in this browser
              </p>
            )}
          </div>
        )}
      </div>
    </ConsolidatedLayout>
  );
}
