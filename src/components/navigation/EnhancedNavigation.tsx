
import React from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, Home, User, BookOpen, HelpCircle, MessageSquare, FileQuestion } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    title: "Main",
    items: [
      {
        title: "Home",
        href: "/",
        description: "Return to the main landing page",
        icon: Home,
      },
      {
        title: "Dashboard",
        href: "/dashboard",
        description: "Your personal learning dashboard",
        icon: BookOpen,
        badge: "New",
      },
      {
        title: "Profile",
        href: "/profile",
        description: "Manage your account and preferences",
        icon: User,
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "Help Center",
        href: "/help",
        description: "Find answers and guides",
        icon: HelpCircle,
      },
      {
        title: "Contact Us",
        href: "/contact",
        description: "Get in touch with our team",
        icon: MessageSquare,
      },
      {
        title: "FAQ",
        href: "/faq",
        description: "Frequently asked questions",
        icon: FileQuestion,
      },
    ],
  },
];

export function EnhancedNavigation() {
  const location = useLocation();

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10 px-4 py-2 bg-transparent hover:bg-accent/80 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
            Navigation
            <ChevronDown className="ml-1 h-4 w-4" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
              {navigationSections.map((section) => (
                <div key={section.title} className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground px-3">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <NavigationMenuLink key={item.href} asChild>
                        <Link
                          to={item.href}
                          className={cn(
                            "group flex items-start space-x-3 rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            location.pathname === item.href && "bg-accent/50"
                          )}
                        >
                          {item.icon && (
                            <item.icon className="mt-0.5 h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.title}</span>
                              {item.badge && (
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
