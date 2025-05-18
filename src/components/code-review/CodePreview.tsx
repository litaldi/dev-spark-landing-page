
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { CodeLanguage } from './types';

interface CodePreviewProps {
  code: string;
  language: CodeLanguage;
}

export function CodePreview({ code, language }: CodePreviewProps) {
  return (
    <Card className="overflow-hidden border">
      <div className="bg-muted px-4 py-2 border-b text-xs font-medium">
        {getLanguageLabel(language)}
      </div>
      <ScrollArea className="h-[500px]">
        <pre className="p-4 text-sm">
          <code className="font-mono whitespace-pre-wrap break-words">
            {code}
          </code>
        </pre>
      </ScrollArea>
    </Card>
  );
}

function getLanguageLabel(language: CodeLanguage): string {
  switch (language) {
    case 'javascript': return 'JavaScript';
    case 'typescript': return 'TypeScript';
    case 'python': return 'Python';
    case 'html': return 'HTML';
    case 'css': return 'CSS';
    default: return language;
  }
}
