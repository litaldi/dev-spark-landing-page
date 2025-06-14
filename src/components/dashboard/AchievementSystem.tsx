
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Medal, 
  Star, 
  Flame, 
  Target, 
  BookOpen,
  Code,
  Users,
  Calendar,
  Zap,
  Crown,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'learning' | 'consistency' | 'social' | 'milestone';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  progress: number;
  total: number;
  unlocked: boolean;
  unlockedAt?: Date;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementSystemProps {
  className?: string;
}

export function AchievementSystem({ className }: AchievementSystemProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    // Initialize achievements based on user progress
    const initializeAchievements = () => {
      const baseAchievements: Achievement[] = [
        {
          id: 'first-lesson',
          title: 'First Steps',
          description: 'Complete your first lesson',
          icon: BookOpen,
          category: 'learning',
          tier: 'bronze',
          progress: 1,
          total: 1,
          unlocked: true,
          unlockedAt: new Date(Date.now() - 86400000 * 2),
          points: 10,
          rarity: 'common'
        },
        {
          id: 'week-streak',
          title: 'Week Warrior',
          description: 'Maintain a 7-day learning streak',
          icon: Flame,
          category: 'consistency',
          tier: 'silver',
          progress: 5,
          total: 7,
          unlocked: false,
          points: 50,
          rarity: 'rare'
        },
        {
          id: 'code-master',
          title: 'Code Master',
          description: 'Complete 25 coding exercises',
          icon: Code,
          category: 'learning',
          tier: 'gold',
          progress: 18,
          total: 25,
          unlocked: false,
          points: 100,
          rarity: 'epic'
        },
        {
          id: 'early-bird',
          title: 'Early Bird',
          description: 'Start a study session before 8 AM',
          icon: Target,
          category: 'milestone',
          tier: 'bronze',
          progress: 0,
          total: 1,
          unlocked: false,
          points: 25,
          rarity: 'common'
        },
        {
          id: 'study-marathon',
          title: 'Study Marathon',
          description: 'Study for 4 hours in a single day',
          icon: Medal,
          category: 'milestone',
          tier: 'gold',
          progress: 2.5,
          total: 4,
          unlocked: false,
          points: 75,
          rarity: 'rare'
        },
        {
          id: 'community-helper',
          title: 'Community Helper',
          description: 'Help 10 fellow learners in discussions',
          icon: Users,
          category: 'social',
          tier: 'silver',
          progress: 3,
          total: 10,
          unlocked: false,
          points: 60,
          rarity: 'rare'
        },
        {
          id: 'perfectionist',
          title: 'Perfectionist',
          description: 'Score 100% on 5 consecutive quizzes',
          icon: Star,
          category: 'learning',
          tier: 'platinum',
          progress: 2,
          total: 5,
          unlocked: false,
          points: 200,
          rarity: 'legendary'
        },
        {
          id: 'monthly-champion',
          title: 'Monthly Champion',
          description: 'Top learner of the month',
          icon: Crown,
          category: 'milestone',
          tier: 'platinum',
          progress: 0,
          total: 1,
          unlocked: false,
          points: 500,
          rarity: 'legendary'
        }
      ];
      
      setAchievements(baseAchievements);
      
      // Calculate total points from unlocked achievements
      const points = baseAchievements
        .filter(a => a.unlocked)
        .reduce((sum, a) => sum + a.points, 0);
      setTotalPoints(points);
    };

    initializeAchievements();
  }, []);

  const categories = [
    { id: 'all', label: 'All Achievements', icon: Trophy },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'consistency', label: 'Consistency', icon: Flame },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'milestone', label: 'Milestones', icon: Target }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-amber-600 bg-amber-50 dark:bg-amber-950';
      case 'silver': return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
      case 'gold': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950';
      case 'platinum': return 'text-purple-600 bg-purple-50 dark:bg-purple-950';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-yellow-400 shadow-yellow-100 dark:shadow-yellow-900/20';
      default: return 'border-gray-300';
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercentage = (unlockedCount / achievements.length) * 100;

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Achievement System
            </CardTitle>
            <CardDescription>
              Unlock badges and earn points as you learn
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{totalPoints}</div>
            <div className="text-xs text-muted-foreground">Total Points</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="p-4 rounded-lg border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Achievement Progress</span>
            <span className="text-sm text-muted-foreground">
              {unlockedCount} of {achievements.length} unlocked
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {Math.round(progressPercentage)}% complete • Keep learning to unlock more!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-3 w-3" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAchievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const progressPercentage = (achievement.progress / achievement.total) * 100;
            
            return (
              <div
                key={achievement.id}
                className={cn(
                  "p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md group relative",
                  "animate-fade-in",
                  achievement.unlocked 
                    ? `${getRarityColor(achievement.rarity)} bg-gradient-to-br from-background to-muted/30` 
                    : "border-muted bg-muted/20 opacity-75",
                  achievement.rarity === 'legendary' ? 'shadow-lg' : ''
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Rarity Indicator */}
                {achievement.rarity !== 'common' && (
                  <div className={cn(
                    "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                    achievement.rarity === 'rare' ? 'bg-blue-500 text-white' : '',
                    achievement.rarity === 'epic' ? 'bg-purple-500 text-white' : '',
                    achievement.rarity === 'legendary' ? 'bg-yellow-500 text-black animate-pulse' : ''
                  )}>
                    {achievement.rarity === 'rare' && 'R'}
                    {achievement.rarity === 'epic' && 'E'}
                    {achievement.rarity === 'legendary' && '★'}
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-3 rounded-lg transition-all duration-200",
                    achievement.unlocked 
                      ? "bg-primary/10 text-primary group-hover:bg-primary/20" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {achievement.unlocked ? (
                      <Icon className="h-6 w-6" />
                    ) : (
                      <Lock className="h-6 w-6" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={cn(
                          "font-semibold",
                          achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <Badge className={getTierColor(achievement.tier)}>
                          {achievement.tier}
                        </Badge>
                        <span className="text-xs font-medium text-primary">
                          +{achievement.points}
                        </span>
                      </div>
                    </div>
                    
                    {!achievement.unlocked && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.total}</span>
                        </div>
                        <Progress value={progressPercentage} className="h-1" />
                      </div>
                    )}
                    
                    {achievement.unlocked && achievement.unlockedAt && (
                      <p className="text-xs text-muted-foreground">
                        Unlocked {achievement.unlockedAt.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No achievements in this category yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
