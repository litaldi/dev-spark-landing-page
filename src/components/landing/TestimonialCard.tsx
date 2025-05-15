
import React, { useState, useEffect, useCallback } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem, 
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";
import { testimonials } from "@/data/landingPageData";

const TestimonialCard: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  // Improved effect hook with proper cleanup and type safety
  useEffect(() => {
    if (!carouselApi) return;
    
    const onChange = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };
    
    // Add event listener
    carouselApi.on("select", onChange);
    
    // Clean up event listener on unmount or when API changes
    return () => {
      carouselApi.off("select", onChange);
    };
  }, [carouselApi]);

  // Extract navigation functionality to a separate callback for better organization
  const goToSlide = useCallback((index: number) => {
    if (carouselApi) {
      carouselApi.scrollTo(index);
    }
  }, [carouselApi]);

  return (
    <section 
      className="py-16 md:py-24 bg-gradient-to-br from-brand-50/50 to-white" 
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 
            id="testimonials-title" 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-800"
          >
            Success <span className="text-brand-500">Stories</span>
          </h2>
          
          <Carousel className="w-full" setApi={setCarouselApi}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-4/5 lg:basis-3/4">
                  <Card className="border-brand-200 shadow-md bg-white mx-4">
                    <CardContent className="p-8 md:p-10">
                      <div className="flex flex-col items-center text-center">
                        <QuoteIcon 
                          className="text-brand-400 mb-6 h-12 w-12"
                          aria-hidden="true"
                        />
                        <blockquote className="mb-6">
                          <p className="text-xl md:text-2xl font-medium mb-6 text-brand-800">
                            "{testimonial.quote}"
                          </p>
                        </blockquote>
                        <div className="flex items-center justify-center">
                          <Avatar className="h-12 w-12 mr-3">
                            {testimonial.image ? (
                              <AvatarImage src={testimonial.image} alt={`${testimonial.name}'s profile photo`} />
                            ) : (
                              <AvatarFallback className="bg-brand-100 text-brand-600">
                                {testimonial.initial}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="text-left">
                            <p className="font-medium">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">
                              {testimonial.position}, {testimonial.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Improve nav button accessibility */}
            <div className="hidden md:flex">
              <CarouselPrevious 
                className="relative left-0" 
                aria-label="Previous testimonial" 
              />
              <CarouselNext 
                className="relative right-0" 
                aria-label="Next testimonial" 
              />
            </div>
          </Carousel>
          
          {/* Enhance the dots navigation with proper accessibility */}
          <div 
            className="flex justify-center gap-2 mt-6" 
            role="tablist" 
            aria-label="Testimonials navigation"
          >
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                  index === activeIndex ? "bg-brand-500" : "bg-brand-200"
                } focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2`}
                aria-selected={index === activeIndex ? "true" : "false"}
                role="tab"
                aria-label={`Testimonial ${index + 1}`}
                aria-controls={`testimonial-${index}`}
                tabIndex={0}
                onClick={() => goToSlide(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    goToSlide(index);
                  }
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCard;
