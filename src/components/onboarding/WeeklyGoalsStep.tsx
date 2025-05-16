
import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface WeeklyGoalsStepProps {
  onPrevious: () => void;
  isLoading: boolean;
}

export const WeeklyGoalsStep: React.FC<WeeklyGoalsStepProps> = ({ onPrevious, isLoading }) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="weeklyGoal"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Weekly Learning Goal (hours)</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <Slider
                  value={[field.value]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                  max={40}
                  min={1}
                  step={1}
                  aria-label="Set weekly learning goal in hours"
                />
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">1 hour</span>
                  <span className="font-medium">{field.value} hours</span>
                  <span className="text-muted-foreground text-sm">40 hours</span>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="receiveUpdates"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-label="Receive updates about new courses and features"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm font-normal">
                I want to receive updates about new courses, features and promotions
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevious}
          className="transition-all duration-300 hover:-translate-x-1"
          aria-label="Go back to previous step"
        >
          Back
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="transition-all duration-300"
          aria-label="Complete onboarding setup"
        >
          {isLoading ? "Saving..." : "Complete Setup"}
        </Button>
      </div>
    </div>
  );
};
