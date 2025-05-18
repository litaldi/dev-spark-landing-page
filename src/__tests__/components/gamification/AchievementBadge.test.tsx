
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AchievementBadge, Achievement } from '@/components/gamification/AchievementBadge';

describe('AchievementBadge Component', () => {
  // Sample achievement for testing
  const mockAchievement: Achievement = {
    id: 'test-achievement',
    title: 'Test Achievement',
    description: 'This is a test achievement',
    icon: 'star',
    isUnlocked: true,
    category: 'test',
  };

  const lockedAchievement: Achievement = {
    ...mockAchievement,
    id: 'locked-achievement',
    title: 'Locked Achievement',
    isUnlocked: false,
  };

  const progressAchievement: Achievement = {
    ...mockAchievement,
    id: 'progress-achievement',
    title: 'Progress Achievement',
    progress: 3,
    maxProgress: 5,
  };

  test('renders an unlocked achievement correctly', () => {
    render(<AchievementBadge achievement={mockAchievement} />);
    
    expect(screen.getByText('Test Achievement')).toBeInTheDocument();
    // Should not have lock icon for unlocked achievement
    const badges = document.querySelectorAll('svg');
    const hasLockIcon = Array.from(badges).some(badge => badge.getAttribute('data-testid') === 'lock-icon');
    expect(hasLockIcon).toBeFalsy();
  });

  test('renders a locked achievement with lock icon', () => {
    render(<AchievementBadge achievement={lockedAchievement} />);
    
    expect(screen.getByText('Locked Achievement')).toBeInTheDocument();
    // Should contain lock icon
    const lockIcon = document.querySelector('svg[data-testid="lock-icon"]');
    expect(lockIcon).toBeTruthy();
  });

  test('displays progress for achievements with progress tracking', () => {
    render(<AchievementBadge achievement={progressAchievement} showProgress={true} />);
    
    expect(screen.getByText('3/5')).toBeInTheDocument();
  });
  
  test('hides progress when showProgress is false', () => {
    render(<AchievementBadge achievement={progressAchievement} showProgress={false} />);
    
    expect(screen.queryByText('3/5')).not.toBeInTheDocument();
  });

  test('applies correct size classes based on size prop', () => {
    const { rerender } = render(<AchievementBadge achievement={mockAchievement} size="sm" />);
    
    // Find the badge container and check for small size class
    const badge = document.querySelector('.h-12');
    expect(badge).toBeInTheDocument();
    
    // Rerender with medium size
    rerender(<AchievementBadge achievement={mockAchievement} size="md" />);
    const mediumBadge = document.querySelector('.h-16');
    expect(mediumBadge).toBeInTheDocument();
    
    // Rerender with large size
    rerender(<AchievementBadge achievement={mockAchievement} size="lg" />);
    const largeBadge = document.querySelector('.h-20');
    expect(largeBadge).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<AchievementBadge achievement={mockAchievement} onClick={handleClick} />);
    
    const badgeElement = screen.getByText('Test Achievement').parentElement?.parentElement;
    if (badgeElement) {
      badgeElement.click();
      expect(handleClick).toHaveBeenCalled();
    }
  });

  test('renders custom icon when provided', () => {
    const achievementWithCustomIcon: Achievement = {
      ...mockAchievement,
      icon: 'custom',
      customIcon: <span data-testid="custom-icon">🏆</span>,
    };
    
    render(<AchievementBadge achievement={achievementWithCustomIcon} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByText('🏆')).toBeInTheDocument();
  });
});
