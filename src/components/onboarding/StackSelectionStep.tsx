
import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const technologyStacks = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "angular", label: "Angular" },
  { id: "nextjs", label: "Next.js" },
  { id: "node", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "django", label: "Django" },
  { id: "ruby", label: "Ruby" },
  { id: "rails", label: "Rails" },
  { id: "flutter", label: "Flutter" },
  { id: "kotlin", label: "Kotlin" },
  { id: "swift", label: "Swift" },
];

interface StackSelectionStepProps {
  onNext: () => void;
}

export const StackSelectionStep: React.FC<StackSelectionStepProps> = ({ onNext }) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="stack"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base font-medium">Select your tech stack</FormLabel>
              <FormDescription>
                Choose the technologies you're interested in learning or improving
              </FormDescription>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {technologyStacks.map((item) => (
                <FormField
                  key={item.id}
                  control={control}
                  name="stack"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="flex justify-end">
        <Button 
          type="button" 
          onClick={onNext}
          className="transition-all duration-300 hover:translate-x-1"
          aria-label="Go to next step"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
