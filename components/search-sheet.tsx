"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef, useCallback } from "react";
import { searchItems, type SearchItem } from "@/lib/search-data";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, ArrowUpRight, FolderOpen, FileText } from "@phosphor-icons/react";

export function SearchSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleResultClick = useCallback((item: SearchItem) => {
    router.push(item.url);
    setIsOpen(false);
  }, [router]);

  // Search with debouncing
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const searchResults = searchItems(query);
      setResults(searchResults);
      setSelectedIndex(0);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, handleResultClick]);

  // Focus input when sheet opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'project':
        return <FolderOpen className="w-4 h-4" />;
      case 'note':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'project':
        return 'Project';
      case 'note':
        return 'Note';
      default:
        return 'Other';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className="bg-muted hover:bg-background gap-2"
        >
          <MagnifyingGlass className="w-4 h-4" />
          <div className="hidden md:block">Search</div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="space-y-4">
          <SheetTitle className="text-left">Search</SheetTitle>
          <SheetDescription className="text-left">
            Search through projects, notes, and more
          </SheetDescription>
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              ref={inputRef}
              placeholder="Search projects, notes, and more..."
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </SheetHeader>
        
        <div className="mt-6 space-y-2">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          )}
          
          {!isLoading && query && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-2 font-sans">Try different keywords or check spelling</p>
            </div>
          )}
          
          {!isLoading && !query && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Start typing to search...</p>
              <p className="text-sm mt-2 font-sans">Search through projects and notes</p>
            </div>
          )}
          
          {!isLoading && results.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground mb-3 font-sans">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </p>
              {results.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    index === selectedIndex
                      ? 'bg-muted border border-border'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleResultClick(item)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <span className="text-lg">{item.emoji}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground truncate font-display">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {getCategoryIcon(item.category)}
                          <span>{getCategoryLabel(item.category)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 font-sans">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{item.url}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center font-sans">
            Use ↑↓ to navigate, Enter to select, Esc to close
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
