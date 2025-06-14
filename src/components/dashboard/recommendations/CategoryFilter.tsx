
import React from 'react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="flex items-center gap-2"
          >
            <Icon className="h-3 w-3" />
            {category.label}
          </Button>
        );
      })}
    </div>
  );
}
