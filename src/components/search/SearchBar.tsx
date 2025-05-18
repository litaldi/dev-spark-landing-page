
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useViewportSize } from "@/hooks/use-mobile";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  variant?: "navbar" | "hero";
}

export const SearchBar = ({ 
  className, 
  placeholder = "Search documentation...", 
  variant = "navbar" 
}: SearchBarProps) => {
  const [open, setOpen] = useState(false);
  const { width } = useViewportSize();
  const isMobileView = width < 480;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (variant === "hero") {
    return (
      <div className={cn(
        "relative w-full max-w-md mx-auto",
        className
      )}>
        <div className="relative">
          <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            type="search"
            placeholder={isMobileView ? "Search..." : placeholder}
            className="pl-9 sm:pl-10 pr-10 sm:pr-12 py-4 sm:py-6 h-10 sm:h-12 rounded-full bg-background border border-input shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 text-sm sm:text-base"
            onClick={() => setOpen(true)}
            aria-label="Search documentation"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-4 sm:h-5 select-none items-center gap-1 rounded border bg-muted px-1 sm:px-1.5 font-mono text-[9px] sm:text-[10px] font-medium opacity-100 text-muted-foreground">
            <span className="text-[9px] sm:text-xs">⌘</span>K
          </kbd>
        </div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Documentation">
              <CommandItem>
                <span>Getting Started</span>
              </CommandItem>
              <CommandItem>
                <span>Components</span>
              </CommandItem>
              <CommandItem>
                <span>Authentication</span>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Resources">
              <CommandItem>
                <span>Blog</span>
              </CommandItem>
              <CommandItem>
                <span>GitHub</span>
              </CommandItem>
              <CommandItem>
                <span>Discord</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className={cn(
          "relative h-8 w-8 sm:h-9 sm:w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2",
          "text-sm text-muted-foreground rounded-md border border-input bg-background shadow-sm transition-all"
        )}
        aria-label="Search documentation"
      >
        <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Documentation">
            <CommandItem>
              <span>Getting Started</span>
            </CommandItem>
            <CommandItem>
              <span>Components</span>
            </CommandItem>
            <CommandItem>
              <span>Authentication</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Resources">
            <CommandItem>
              <span>Blog</span>
            </CommandItem>
            <CommandItem>
              <span>GitHub</span>
            </CommandItem>
            <CommandItem>
              <span>Discord</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};
