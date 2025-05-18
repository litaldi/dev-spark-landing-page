
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Calendar, ArrowRight, Clock } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Progress } from "@/components/ui/progress";

export interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  role: "admin" | "member";
  lastActive?: string;
}

export interface StudyGroupData {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
  topic: string;
  lastActive: string;
  nextSession?: {
    date: string;
    title: string;
  };
  tasksCompleted: number;
  totalTasks: number;
}

interface StudyGroupProps {
  group?: StudyGroupData;
  isLoading?: boolean;
  joinGroup?: (groupId: string) => void;
}

export function StudyGroup({ group, isLoading = false, joinGroup }: StudyGroupProps) {
  // If no group is provided, use a default mock group
  const [defaultGroup] = useLocalStorage<StudyGroupData>("defaultStudyGroup", {
    id: "group-1",
    name: "Web Dev Mastermind",
    description: "A group focused on mastering web development with React and TypeScript",
    members: [
      { id: "user-1", name: "Alex Chen", avatar: "", role: "admin" },
      { id: "user-2", name: "Bella Kim", avatar: "", role: "member" },
      { id: "user-3", name: "Carlos Mendez", avatar: "", role: "member" }
    ],
    topic: "React & TypeScript",
    lastActive: "2025-05-17T14:30:00Z",
    nextSession: {
      date: "2025-05-20T18:00:00Z",
      title: "React Hooks Deep Dive"
    },
    tasksCompleted: 12,
    totalTasks: 20
  });

  const activeGroup = group || defaultGroup;

  const handleJoinClick = () => {
    if (joinGroup) {
      joinGroup(activeGroup.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card className="w-full animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{activeGroup.name}</span>
          <Badge variant="outline" className="ml-2">
            {activeGroup.topic}
          </Badge>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5" />
          <span>{activeGroup.members.length} members</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
          <Clock className="h-3.5 w-3.5" />
          <span>Last active {new Date(activeGroup.lastActive).toLocaleDateString()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {activeGroup.description}
        </p>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Group progress</span>
            <span>{activeGroup.tasksCompleted}/{activeGroup.totalTasks} tasks</span>
          </div>
          <Progress value={(activeGroup.tasksCompleted / activeGroup.totalTasks) * 100} className="h-2" />
        </div>
        
        {activeGroup.nextSession && (
          <div className="rounded-md border border-gray-200 dark:border-gray-800 p-3 bg-gray-50 dark:bg-gray-900/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" /> Next session
            </p>
            <div className="flex justify-between items-center">
              <p className="font-medium">{activeGroup.nextSession.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{formatDate(activeGroup.nextSession.date)}</p>
            </div>
          </div>
        )}
        
        <div className="flex -space-x-2">
          {activeGroup.members.slice(0, 3).map((member) => (
            <Avatar key={member.id} className="border-2 border-background">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
          {activeGroup.members.length > 3 && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-background bg-gray-100 dark:bg-gray-800">
              <span className="text-xs font-medium">+{activeGroup.members.length - 3}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>Chat</span>
        </Button>
        
        <Button size="sm" className="flex items-center gap-1">
          <span>Go to Group</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
