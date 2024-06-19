"use client";

import { GithubLogo, LinkedinLogo, FilePdf, MagnifyingGlass } from "@phosphor-icons/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type componentType = { title: string; href: string; description: string };
const components1: componentType[] = [
  {
    title: "Reinforcement Learning",
    href: "/projects/omniverse-gym",
    description:
      "A modal dialog that interrupts the user with important content",
  },
  {
    title: "Visual Localization",
    href: "/projects/ros-vslam",
    description: "Learn how robots can map unknown worlds visually",
  },
  {
    title: "Co-op Planning",
    href: "/projects/robot-transformers",
    description:
      "Displays an indicator showing the completion progress of a task",
  },
  {
    title: "🐝 Astrobee",
    href: "/projects/astrobee",
    description:
      "Learn about the code running on free-flying robots on the Space Station",
  },
];
const components2: componentType[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
];
const components3: componentType[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
];
function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components1.map((component) => (
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
                View All Projects
              </Button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
                View All Guides
              </Button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Notes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components3.map((component) => (
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
                View All Notes
              </Button>
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
  return (
    <header className="fixed w-full z-30 bg-opacity-90 bg-gray-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="hidden md:flex items-center justify-between h-16 md:h-20">
          <a href="/">
            <Button variant={"outline"} className="bg-gray-100 hover:bg-white">
              👦🏻 Khaled S.
            </Button>
          </a>

          <NavigationMenuDemo />

          <div className="flex gap-4 items-center justify-center">
            <a href="/pdf/cv.pdf" target="_blank">
              <FilePdf size={24} />
            </a>
            <a href="https://github.com/khaledsharif" target="_blank">
              <GithubLogo size={24} />
            </a>
            <a href="https://www.linkedin.com/in/khsharif" target="_blank">
              <LinkedinLogo size={24} />
            </a>
            <Button variant={"outline"} className="bg-gray-100 hover:bg-white gap-2">
              <MagnifyingGlass size={16} />
              Search
            </Button>
          </div>
        </div>
        <div className="flex md:hidden items-center justify-between h-16 md:h-20">
          <a href="/">
            <Button variant={"outline"} className="bg-gray-100 hover:bg-white">
              👦🏻 Khaled S.
            </Button>
          </a>

          <div className="flex gap-4">
            <a href="/pdf/cv.pdf" target="_blank">
              <FilePdf size={24} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
