
import React, { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Loader } from "lucide-react";

interface WeeklyGoalsStepProps {
  onPrevious: () => void;
  isLoading: boolean;
}

export const WeeklyGoalsStep: React.FC<WeeklyGoalsStepProps> = ({ onPrevious, isLoading }) => {
  const { control } = useFormContext();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  
  // Automatically focus on the weekly goal slider when step is mounted
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sliderRef.current) {
      // Focus on the slider when component mounts
      setTimeout(() => {
        const slider = sliderRef.current?.querySelector('[role="slider"]');
        if (slider) {
          (slider as HTMLElement).focus();
        }
      }, 100);
    }
    
    // Announce to screen readers that we're on the weekly goals step
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = 'Weekly goals step. Set your weekly learning goals and notification preferences.';
    document.body.appendChild(announcement);
    
    return () => {
      document.body.removeChild(announcement);
    };
  }, []);

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="weeklyGoal"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium" id="weekly-goal-label">Weekly Learning Goal (hours)</FormLabel>
            <FormControl>
              <div className="space-y-4" ref={sliderRef}>
                <Slider
                  value={[field.value]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                  max={40}
                  min={1}
                  step={1}
                  aria-labelledby="weekly-goal-label"
                  aria-valuemin={1}
                  aria-valuemax={40}
                  aria-valuenow={field.value}
                  aria-valuetext={`${field.value} hours per week`}
                />
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">1 hour</span>
                  <span className="font-medium" aria-live="polite" aria-atomic="true">{field.value} hours</span>
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
                id="receive-updates"
                aria-describedby="updates-description"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm font-normal" htmlFor="receive-updates">
                I want to receive updates about new courses, features and promotions
              </FormLabel>
              <p id="updates-description" className="sr-only">
                Check this box if you want to receive occasional emails about new courses, features and promotions
              </p>
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
          ref={submitButtonRef}
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Saving...</span>
              <span className="sr-only">Please wait while we save your preferences</span>
            </>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </div>
    </div>
  );
};
