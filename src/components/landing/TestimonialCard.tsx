
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Senior Sales Rep",
    company: "TechCorp Solutions",
    rating: 5,
    content: "VoiceSeller transformed my cold calling approach. I've increased my conversion rate by 40% in just two months.",
    avatar: "S"
  },
  {
    name: "Michael Chen",
    role: "Sales Manager",
    company: "CloudFirst Inc",
    rating: 5,
    content: "The AI feedback is incredibly insightful. My team's objection handling has improved dramatically since we started using VoiceSeller.",
    avatar: "M"
  },
  {
    name: "Emily Rodriguez",
    role: "Business Development",
    company: "StartupGrow",
    rating: 5,
    content: "As a new sales professional, VoiceSeller gave me the confidence I needed. The practice scenarios feel so realistic!",
    avatar: "E"
  }
];

const TestimonialCard: React.FC = () => {
  return (
    <>
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="h-full">
          <CardContent className="p-6">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            {/* Testimonial content */}
            <blockquote className="text-muted-foreground mb-4 italic">
              "{testimonial.content}"
            </blockquote>
            
            {/* Author info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-800 flex items-center justify-center font-semibold text-brand-700 dark:text-brand-300">
                {testimonial.avatar}
              </div>
              <div>
                <div className="font-semibold text-sm">{testimonial.name}</div>
                <div className="text-xs text-muted-foreground">
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default TestimonialCard;
