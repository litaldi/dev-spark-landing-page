
import React, { useState } from "react";
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

const testimonials = [
  {
    quote: "I landed my first frontend job in 6 weeks thanks to this app. I finally felt ready.",
    name: "Dana",
    position: "Junior Developer",
    location: "Tel Aviv",
    initial: "D",
    image: null
  },
  {
    quote: "The AI feedback on my resume was incredible. Three interviews within a week of updating it.",
    name: "Michael",
    position: "Full Stack Developer",
    location: "Berlin",
    initial: "M",
    image: null
  },
  {
    quote: "The interview simulator prepared me for questions I never thought I'd be asked. Lifesaver!",
    name: "Priya",
    position: "Frontend Engineer",
    location: "Toronto",
    initial: "P",
    image: null
  }
];

const TestimonialCard: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!carouselApi) return;
    
    const onChange = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };
    
    carouselApi.on("select", onChange);
    return () => {
      carouselApi.off("select", onChange);
    };
  }, [carouselApi]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand-50/50 to-white" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 id="testimonials-title" className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-800">
            Success <span className="text-brand-500">Stories</span>
          </h2>
          
          <Carousel className="w-full" setApi={setCarouselApi}>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-4/5 lg:basis-3/4">
                  <Card className="border-brand-200 shadow-md bg-white mx-4">
                    <CardContent className="p-8 md:p-10">
                      <div className="flex flex-col items-center text-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="48" 
                          height="48" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="1" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="text-brand-400 mb-6"
                          aria-hidden="true"
                        >
                          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                        </svg>
                        <blockquote>
                          <p className="text-xl md:text-2xl font-medium mb-6 text-brand-800">
                            "{testimonial.quote}"
                          </p>
                        </blockquote>
                        <div className="flex items-center justify-center">
                          <Avatar className="h-12 w-12 mr-3">
                            {testimonial.image ? (
                              <AvatarImage src={testimonial.image} alt={testimonial.name} />
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
            <div className="hidden md:flex">
              <CarouselPrevious className="relative left-0" aria-label="Previous testimonial" />
              <CarouselNext className="relative right-0" aria-label="Next testimonial" />
            </div>
          </Carousel>
          
          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonials navigation">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                  index === activeIndex ? "bg-brand-500" : "bg-brand-200"
                } focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2`}
                aria-selected={index === activeIndex ? "true" : "false"}
                role="tab"
                aria-label={`Testimonial ${index + 1}`}
                tabIndex={0}
                onClick={() => carouselApi?.scrollTo(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCard;
