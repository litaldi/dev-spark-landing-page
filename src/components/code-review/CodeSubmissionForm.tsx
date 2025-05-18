
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CodeLanguage } from './types';
import { Alert, AlertDescription } from '@/components/ui/alert';

const supportedLanguages: { value: CodeLanguage; label: string }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
];

const formSchema = z.object({
  code: z.string().min(10, "Code must be at least 10 characters long"),
  language: z.enum(['javascript', 'typescript', 'python', 'html', 'css']),
});

type FormValues = z.infer<typeof formSchema>;

interface CodeSubmissionFormProps {
  onSubmit: (code: string, language: CodeLanguage) => void;
  isSubmitting: boolean;
  error?: string | null;
}

export function CodeSubmissionForm({ onSubmit, isSubmitting, error }: CodeSubmissionFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      language: 'javascript',
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.code, values.language);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Submit Code for Review</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Programming Language</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {supportedLanguages.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code Snippet</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field}
                    className="font-mono min-h-[300px] resize-y"
                    placeholder="Paste your code here..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Analyzing Code..." : "Submit for Review"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
