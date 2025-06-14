
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Map, 
  Target, 
  CheckCircle, 
  Circle, 
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Clock,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LearningPathCustomizerProps {
  className?: string;
}

interface LearningStep {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  optional?: boolean;
  prerequisites?: string[];
}

export function LearningPathCustomizer({ className }: LearningPathCustomizerProps) {
  const [selectedPath, setSelectedPath] = useState('fullstack-react');
  const [customizing, setCustomizing] = useState(false);

  const learningPaths = {
    'fullstack-react': {
      title: 'Full-Stack React Developer',
      description: 'Master React, Node.js, and database integration',
      totalSteps: 12,
      estimatedHours: 45,
      difficulty: 'intermediate',
      steps: [
        {
          id: '1',
          title: 'React Fundamentals',
          description: 'Components, props, state, and event handling',
          estimatedTime: '4 hours',
          difficulty: 'beginner' as const,
          completed: true
        },
        {
          id: '2',
          title: 'React Hooks Deep Dive',
          description: 'useState, useEffect, custom hooks, and context',
          estimatedTime: '3 hours',
          difficulty: 'intermediate' as const,
          completed: true
        },
        {
          id: '3',
          title: 'State Management with Redux',
          description: 'Redux Toolkit, actions, reducers, and middleware',
          estimatedTime: '4 hours',
          difficulty: 'intermediate' as const,
          completed: false,
          optional: true
        },
        {
          id: '4',
          title: 'React Router & Navigation',
          description: 'Client-side routing and protected routes',
          estimatedTime: '2 hours',
          difficulty: 'beginner' as const,
          completed: false
        },
        {
          id: '5',
          title: 'API Integration & Data Fetching',
          description: 'Fetch API, Axios, React Query, and error handling',
          estimatedTime: '3 hours',
          difficulty: 'intermediate' as const,
          completed: false,
          prerequisites: ['1', '2']
        },
        {
          id: '6',
          title: 'Node.js & Express Basics',
          description: 'Server setup, routing, and middleware',
          estimatedTime: '5 hours',
          difficulty: 'intermediate' as const,
          completed: false
        },
        {
          id: '7',
          title: 'Database Integration',
          description: 'MongoDB, Mongoose, and CRUD operations',
          estimatedTime: '4 hours',
          difficulty: 'intermediate' as const,
          completed: false,
          prerequisites: ['6']
        },
        {
          id: '8',
          title: 'Authentication & Security',
          description: 'JWT, bcrypt, and secure API endpoints',
          estimatedTime: '4 hours',
          difficulty: 'advanced' as const,
          completed: false,
          prerequisites: ['6', '7']
        }
      ]
    }
  };

  const currentPath = learningPaths[selectedPath as keyof typeof learningPaths];
  const completedSteps = currentPath.steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / currentPath.totalSteps) * 100;

  const handleStepToggle = (stepId: string) => {
    // In a real app, this would update the backend
    console.log('Toggling step:', stepId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950';
      case 'advanced': return 'text-red-600 bg-red-50 dark:bg-red-950';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
    }
  };

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              Learning Path Customizer
            </CardTitle>
            <CardDescription>
              Personalize your learning journey and track progress
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCustomizing(!customizing)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {customizing ? 'Done' : 'Customize'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Path Overview */}
        <div className="p-4 rounded-lg border bg-muted/50">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">{currentPath.title}</h3>
              <p className="text-sm text-muted-foreground">{currentPath.description}</p>
            </div>
            <Badge className={getDifficultyColor(currentPath.difficulty)}>
              {currentPath.difficulty}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress: {completedSteps} of {currentPath.totalSteps} steps</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              ~{currentPath.estimatedHours} hours total
            </span>
            <span className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {currentPath.totalSteps} learning modules
            </span>
          </div>
        </div>

        {/* Learning Steps */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Learning Steps</h3>
            {customizing && (
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {currentPath.steps.map((step, index) => {
              const isCompleted = step.completed;
              const isNextStep = !isCompleted && index === completedSteps;
              
              return (
                <div
                  key={step.id}
                  className={cn(
                    "p-4 rounded-lg border transition-all duration-200",
                    isCompleted ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800" : "",
                    isNextStep ? "ring-2 ring-primary ring-opacity-50 bg-primary/5" : "",
                    "hover:shadow-sm"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {customizing ? (
                      <Checkbox 
                        checked={isCompleted}
                        onCheckedChange={() => handleStepToggle(step.id)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1">
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    )}
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={cn(
                            "font-medium",
                            isCompleted ? "text-green-800 dark:text-green-300" : ""
                          )}>
                            {step.title}
                            {step.optional && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                Optional
                              </Badge>
                            )}
                            {isNextStep && (
                              <Badge className="ml-2 text-xs">
                                Next Up
                              </Badge>
                            )}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                        
                        {customizing && (
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {step.estimatedTime}
                        </span>
                        <Badge variant="outline" className={cn("text-xs", getDifficultyColor(step.difficulty))}>
                          {step.difficulty}
                        </Badge>
                        {step.prerequisites && step.prerequisites.length > 0 && (
                          <span className="text-xs">
                            Requires: Step {step.prerequisites.join(', ')}
                          </span>
                        )}
                      </div>
                      
                      {isNextStep && !isCompleted && (
                        <Button size="sm" className="mt-2">
                          Start This Step
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Path Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" size="sm">
            <Star className="h-4 w-4 mr-2" />
            Save as Template
          </Button>
          <Button variant="outline" size="sm">
            Share Path
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
