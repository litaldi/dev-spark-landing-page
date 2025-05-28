
import React from 'react';
import { render, screen } from '../test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AchievementBadge } from '@/components/gamification/AchievementBadge';

// Add jest-axe custom matcher
expect.extend(toHaveNoViolations);

describe('AchievementBadge Accessibility', () => {
  const mockAchievement = {
    id: 'test-achievement',
    title: 'Test Achievement',
    description: 'This is a test achievement',
    icon: 'star' as const,
    isUnlocked: true,
    category: 'test',
  };

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <AchievementBadge achievement={mockAchievement} />
    );
    
    // Run the accessibility tests
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('unlocked achievement has appropriate presentation for screen readers', () => {
    render(
      <AchievementBadge 
        achievement={{
          ...mockAchievement,
          title: 'Screen Reader Friendly'
        }} 
      />
    );
    
    // Check if achievement title is visible to screen readers
    expect(screen.getByText('Screen Reader Friendly')).toBeInTheDocument();
  });
  
  test('locked achievement conveys locked state visually and programmatically', () => {
    render(
      <AchievementBadge 
        achievement={{
          ...mockAchievement,
          isUnlocked: false,
          title: 'Locked Achievement'
        }} 
      />
    );
    
    // Visual indication (though this is harder to test directly)
    const lockIcon = document.querySelector('svg[data-testid="lock-icon"]');
    expect(lockIcon).toBeInTheDocument();
    
    // Text appears visually different (via CSS classes)
    const titleElement = screen.getByText('Locked Achievement');
    expect(titleElement).toHaveClass('text-gray-500');
  });
  
  test('achievement with progress shows accurate progress visually and textually', () => {
    render(
      <AchievementBadge 
        achievement={{
          ...mockAchievement,
          progress: 3,
          maxProgress: 5,
        }} 
      />
    );
    
    // Progress text is properly displayed
    expect(screen.getByText('3/5')).toBeInTheDocument();
    
    // Progress bar exists
    const progressBar = document.querySelector('[data-testid="achievement-progress-bar"]');
    expect(progressBar).toBeInTheDocument();
    
    // Progress bar has width set to 60% (3/5)
    expect(progressBar).toHaveStyle({ width: '60%' });
  });
});
