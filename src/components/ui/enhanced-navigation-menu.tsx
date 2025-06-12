
import React from 'react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

interface EnhancedNavigationMenuProps {
  sections: NavigationSection[];
  className?: string;
}

export function EnhancedNavigationMenu({ sections, className }: EnhancedNavigationMenuProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {sections.map((section) => (
          <NavigationMenuItem key={section.title}>
            <NavigationMenuTrigger className="bg-background hover:bg-accent">
              {section.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <div className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      to={section.items[0]?.href || '/'}
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {section.title}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Explore {section.title.toLowerCase()} features and resources
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
                <div className="grid gap-2">
                  {section.items.slice(0, 4).map((item) => (
                    <NavigationMenuItem key={item.href} className="list-none">
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className="flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <div>
                            <div className="text-sm font-medium leading-none">
                              {item.title}
                            </div>
                            {item.description && (
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
