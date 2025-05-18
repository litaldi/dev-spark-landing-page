
import { CodeLanguage, CodeReviewFeedback, FeedbackType, FeedbackSeverity } from '@/components/code-review/types';
import { generateId } from '@/lib/utils';

export function generateSampleFeedback(code: string, language: CodeLanguage): CodeReviewFeedback {
  // Simple logic to generate some feedback based on code length and language
  // In a real implementation, this would be replaced by actual AI analysis

  const items = [];
  let overallScore = 85; // Start with a good score and deduct based on issues
  
  // Detect some common issues based on language
  if (language === 'javascript' || language === 'typescript') {
    if (code.includes('var ')) {
      items.push({
        id: generateId(),
        type: 'best_practice',
        severity: 'medium',
        title: 'Use const/let instead of var',
        description: 'var has function scope which can lead to unexpected behavior. Use const for values that don\'t change, and let for values that do.',
        lineNumbers: findLineNumbers(code, 'var '),
        suggestion: 'Replace var with const or let as appropriate.'
      });
      overallScore -= 5;
    }

    if (code.includes('console.log')) {
      items.push({
        id: generateId(),
        type: 'improvement',
        severity: 'low',
        title: 'Remove console.log statements',
        description: 'Console statements should be removed in production code.',
        lineNumbers: findLineNumbers(code, 'console.log'),
        suggestion: 'Remove or comment out console.log statements before deploying.'
      });
      overallScore -= 2;
    }
    
    if (code.includes('==') && !code.includes('===')) {
      items.push({
        id: generateId(),
        type: 'bug',
        severity: 'high',
        title: 'Use strict equality (===)',
        description: 'Loose equality (==) can cause unexpected type coercion.',
        lineNumbers: findLineNumbers(code, '=='),
        suggestion: 'Replace == with === for strict equality comparison.'
      });
      overallScore -= 8;
    }
  }
  
  if (language === 'python') {
    if (code.includes('except:') && !code.includes('except Exception:')) {
      items.push({
        id: generateId(),
        type: 'bug',
        severity: 'high',
        title: 'Avoid bare except clause',
        description: 'Bare except clauses catch all exceptions including KeyboardInterrupt, making it hard to interrupt the program.',
        lineNumbers: findLineNumbers(code, 'except:'),
        suggestion: 'Use except Exception: to catch most exceptions but allow keyboard interrupts to pass through.'
      });
      overallScore -= 10;
    }
  }
  
  // Check general issues across languages
  if (code.length > 300 && !code.includes('\n\n')) {
    items.push({
      id: generateId(),
      type: 'improvement',
      severity: 'low',
      title: 'Improve code readability',
      description: 'Large blocks of code without proper spacing can reduce readability.',
      suggestion: 'Add empty lines between logical sections of code to improve readability.'
    });
    overallScore -= 3;
  }

  // Security checks
  if (code.includes('eval(') || code.includes('exec(')) {
    items.push({
      id: generateId(),
      type: 'security',
      severity: 'high',
      title: 'Avoid eval() or exec()',
      description: 'Using eval() or exec() can introduce security vulnerabilities by executing arbitrary code.',
      lineNumbers: [...findLineNumbers(code, 'eval('), ...findLineNumbers(code, 'exec(')],
      suggestion: 'Find an alternative approach that doesn\'t require evaluating strings as code.'
    });
    overallScore -= 15;
  }
  
  // Add some accessibility checks for HTML
  if (language === 'html') {
    if (code.includes('<img') && !code.includes('alt=')) {
      items.push({
        id: generateId(),
        type: 'accessibility',
        severity: 'medium',
        title: 'Images missing alt attributes',
        description: 'Images should have alt attributes for screen readers and when images fail to load.',
        lineNumbers: findLineNumbers(code, '<img'),
        suggestion: 'Add descriptive alt text to all <img> tags.'
      });
      overallScore -= 7;
    }
  }

  // Ensure score is within range
  overallScore = Math.max(0, Math.min(100, overallScore));
  
  // Generate summary based on score and number of issues
  let summary = "";
  if (overallScore >= 90) {
    summary = `Your code is of high quality with only ${items.length} minor issues identified.`;
  } else if (overallScore >= 70) {
    summary = `Your code is generally good with ${items.length} issues to address.`;
  } else if (overallScore >= 50) {
    summary = `Your code has ${items.length} significant issues that should be fixed.`;
  } else {
    summary = `Your code has ${items.length} critical issues that require immediate attention.`;
  }

  // Always add a best practice if we have no items yet
  if (items.length === 0) {
    items.push({
      id: generateId(),
      type: 'best_practice',
      severity: 'low',
      title: 'Well-structured code',
      description: 'Your code looks well-structured and follows good practices.',
      suggestion: 'Continue maintaining this level of quality in your code.'
    });
  }
  
  return {
    id: generateId(),
    overallScore,
    summary,
    items
  };
}

function findLineNumbers(code: string, searchString: string): number[] {
  const lines = code.split('\n');
  const lineNumbers: number[] = [];
  
  lines.forEach((line, index) => {
    if (line.includes(searchString)) {
      lineNumbers.push(index + 1);
    }
  });
  
  return lineNumbers;
}
