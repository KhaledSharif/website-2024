"use client";

import {
  GithubLogo,
  LinkedinLogo,
  FilePdf,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { SearchSheet } from "@/components/search-sheet";
import { getAllNotes } from "@/lib/notes-data";
import { getAllProjects } from "@/lib/projects-data";

type componentType = { title: string; href: string; description: string };

const components2: componentType[] = [
  {
    title: "🦾 111",
    href: "/projects/omniverse-gym",
    description:
      "Train robots to perform tasks in sim with reinforcement learning",
  },
  {
    title: "🗺️ 222",
    href: "/projects/ros-vslam",
    description: "Learn how robots can localize & map unknown worlds visually",
  },
  {
    title: "💭 333",
    href: "/projects/robot-transformers",
    description: "Train robots to plan and cooperatively manipulate objects",
  },
  {
    title: "🐝 444",
    href: "/projects/astrobee",
    description:
      "Learn about the code running on free-flying robots on the Space Station",
  },
];

function NavigationMenuDemo() {
  const notes = getAllNotes();
  const projects = getAllProjects();
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[250px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {projects.map((project) => (
                <ListItem
                  key={project.slug}
                  title={`${project.titleIcon} ${project.name}`}
                  href={`/projects/${project.slug}`}
                >
                  {project.description}
                </ListItem>
              ))}
            </ul>
            <div className="w-full flex items-center justify-center pb-2">
              <a href="/projects">
                <Button variant={"ghost"} className="text-sm font-medium">
                  View All Projects
                </Button>
              </a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Galleries</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[250px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components2.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
            <div className="w-full flex items-center justify-center pb-2">
              <Button variant={"ghost"} className="text-sm font-medium">
                View All Galleries
              </Button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Notes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[250px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {notes.map((note) => (
                <ListItem
                  key={note.slug}
                  title={`${note.titleIcon} ${note.name}`}
                  href={`/notes/${note.slug}`}
                >
                  {note.description}
                </ListItem>
              ))}
            </ul>
            <div className="w-full flex items-center justify-center pb-2">
              <a href="/notes">
                <Button variant={"ghost"} className="text-sm font-medium">
                  View All Notes
                </Button>
              </a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors 
            hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`,
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

export default function Header() {
  // Dark mode state and effect
  const [isDark, setIsDark] = useState(false);

  // Initialize state on mount
  useEffect(() => {
    const root = window.document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, []);

  // Toggle handler
  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="fixed w-full z-30 bg-opacity-90 bg-background text-foreground shadow-lg shadow-black/10 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-6xl mx-auto px-1 md:px-5 sm:px-6">
        <div className="flex items-center justify-between h-12 md:h-16 text-foreground">
          <a href="/" className="">
            <Button
              variant={"outline"}
              className="bg-muted hover:bg-background gap-1"
            >
              <div>👦🏻</div>
              <div className="text-[0.85rem] hidden sm:block">Khaled S.</div>
            </Button>
          </a>
          <div className="flex items-center justify-center">
            <NavigationMenuDemo />
          </div>
          <div className="flex gap-4 items-center justify-end">
            <SearchSheet />
            <Button
              variant={"ghost"}
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              className="text-xl px-2"
            >
              {isDark ? "🌙" : "☀️"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
