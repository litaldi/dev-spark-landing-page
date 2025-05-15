
import React from "react";
import { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion";
import { List } from "lucide-react";
import { faqItems } from "@/data/landingPageData";

const FaqAccordion: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="faq-title">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <List className="h-8 w-8 text-brand-500 mr-3" aria-hidden="true" />
            <h2 
              id="faq-title" 
              className="text-3xl md:text-4xl font-bold text-brand-800"
            >
              Frequently <span className="text-brand-500">Asked Questions</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-brand-100 rounded-lg mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger 
                  className="px-6 py-4 text-lg font-medium text-brand-800 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-inset"
                  aria-expanded="false"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Have other questions? <a href="#" className="text-brand-500 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-brand-300 rounded-sm">Contact our support team</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
