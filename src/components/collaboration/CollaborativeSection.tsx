
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StudyGroup, StudyGroupData } from "./StudyGroup";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Plus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CollaborativeSection() {
  const { toast } = useToast();
  const [studyGroups, setStudyGroups] = useLocalStorage<StudyGroupData[]>("userStudyGroups", [
    {
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
    }
  ]);
  
  const [recommendedGroups, setRecommendedGroups] = useLocalStorage<StudyGroupData[]>("recommendedStudyGroups", [
    {
      id: "rec-group-1",
      name: "UI/UX Design Team",
      description: "Exploring latest trends in UI/UX design and user research methodologies",
      members: [
        { id: "user-4", name: "Diana Lee", avatar: "", role: "admin" },
        { id: "user-5", name: "Ethan Wright", avatar: "", role: "member" },
        { id: "user-6", name: "Fiona Chan", avatar: "", role: "member" },
        { id: "user-7", name: "Greg Johnson", avatar: "", role: "member" }
      ],
      topic: "UI/UX Design",
      lastActive: "2025-05-16T09:45:00Z",
      tasksCompleted: 8,
      totalTasks: 15
    },
    {
      id: "rec-group-2",
      name: "JavaScript Algorithms",
      description: "Practice problem-solving and coding algorithms using JavaScript",
      members: [
        { id: "user-8", name: "Hannah Kim", avatar: "", role: "admin" },
        { id: "user-9", name: "Ian Smith", avatar: "", role: "member" },
        { id: "user-10", name: "Julia Nguyen", avatar: "", role: "member" }
      ],
      topic: "JavaScript",
      lastActive: "2025-05-17T16:20:00Z",
      nextSession: {
        date: "2025-05-19T19:00:00Z",
        title: "Binary Tree Problems"
      },
      tasksCompleted: 22,
      totalTasks: 30
    }
  ]);

  const handleJoinGroup = (groupId: string) => {
    toast({
      title: "Group Joined",
      description: "You've successfully joined the study group",
    });
    
    // Move the group from recommended to user's groups
    const groupToJoin = recommendedGroups.find(group => group.id === groupId);
    if (groupToJoin) {
      setStudyGroups([...studyGroups, groupToJoin]);
      setRecommendedGroups(recommendedGroups.filter(group => group.id !== groupId));
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Study Groups
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {studyGroups.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500 dark:text-gray-400">You haven't joined any study groups yet</p>
            <Button className="mt-2" size="sm">
              Browse Groups
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Groups</h3>
            <div className="grid grid-cols-1 gap-4">
              {studyGroups.map(group => (
                <StudyGroup key={group.id} group={group} />
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Recommended for You</h3>
          <div className="grid grid-cols-1 gap-4">
            {recommendedGroups.map(group => (
              <StudyGroup 
                key={group.id} 
                group={group} 
                joinGroup={handleJoinGroup}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="w-full">
          Browse All Groups
        </Button>
        <Button className="ml-2">
          <Plus className="mr-1 h-4 w-4" />
          Create Group
        </Button>
      </CardFooter>
    </Card>
  );
}
