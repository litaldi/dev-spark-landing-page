
import { z } from "zod";

// Form validation schema
export const onboardingSchema = z.object({
  stack: z.array(z.string()).min(1, { message: "Select at least one technology" }),
  weeklyGoal: z.number().min(1).max(40),
  receiveUpdates: z.boolean().default(false),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
