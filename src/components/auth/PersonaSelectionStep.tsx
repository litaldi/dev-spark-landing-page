
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";

interface PersonaSelectionStepProps {
  onPrevious: () => void;
  isLoading: boolean;
}

export const PersonaSelectionStep: React.FC<PersonaSelectionStepProps> = ({ 
  onPrevious,
  isLoading 
}) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="persona"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel id="persona-group-label">I am a:</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-3"
                aria-labelledby="persona-group-label"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="junior" id="junior" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer" htmlFor="junior">
                    Junior Developer
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="mentor" id="mentor" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer" htmlFor="mentor">
                    Mentor
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="instructor" id="instructor" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer" htmlFor="instructor">
                    Instructor
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="acceptTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="accept-terms"
                aria-required="true"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm font-normal" htmlFor="accept-terms">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </div>
  );
};
