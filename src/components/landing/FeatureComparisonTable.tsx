
import React from "react";
import { Check, X } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { pricingFeatures } from "@/data/landingPageData";

const FeatureComparisonTable: React.FC = () => {
  return (
    <section 
      className="py-16 md:py-24 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-900/90" 
      aria-labelledby="pricing-features-title"
    >
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 
            id="pricing-features-title" 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-800 dark:text-brand-100"
          >
            Compare <span className="text-brand-500 dark:text-brand-400">Plans</span>
          </h2>
          
          <div className="rounded-lg border border-brand-100 dark:border-brand-800 overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-brand-50 dark:bg-brand-900/30">
                  <TableRow>
                    <TableHead className="w-1/2 text-lg font-medium text-brand-800 dark:text-brand-200 px-6">Feature</TableHead>
                    <TableHead className="w-1/4 text-lg font-medium text-brand-800 dark:text-brand-200 text-center px-6">Free</TableHead>
                    <TableHead className="w-1/4 text-lg font-medium text-brand-700 dark:text-brand-100 text-center px-6 bg-brand-100/50 dark:bg-brand-800/50">Pro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingFeatures.map((item, index) => (
                    <TableRow 
                      key={index}
                      className={index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-brand-50/30 dark:bg-gray-800/20"}
                    >
                      <TableCell className="font-medium px-6">
                        <div>
                          <p className="font-medium text-brand-700 dark:text-brand-300">{item.feature}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center px-6">
                        {item.free === true && <Check className="h-5 w-5 text-green-500 dark:text-green-400 mx-auto" aria-label="Available" />}
                        {item.free === false && <X className="h-5 w-5 text-gray-400 mx-auto" aria-label="Not available" />}
                        {typeof item.free === 'string' && <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.free}</span>}
                      </TableCell>
                      <TableCell className="text-center px-6 bg-brand-100/20 dark:bg-brand-800/20">
                        {item.pro === true && <Check className="h-5 w-5 text-green-600 dark:text-green-500 mx-auto" aria-label="Available" />}
                        {item.pro === false && <X className="h-5 w-5 text-gray-400 mx-auto" aria-label="Not available" />}
                        {typeof item.pro === 'string' && <span className="text-sm font-medium text-brand-600 dark:text-brand-300">{item.pro}</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparisonTable;
