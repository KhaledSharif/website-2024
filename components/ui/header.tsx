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
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { SearchSheet } from "@/components/search-sheet";

type componentType = { title: string; href: string; description: string };
const components1: componentType[] = [
  {
    title: "🦾 Reinforcement Learning",
    href: "/projects/omniverse-gym",
    description:
      "Train robots to perform tasks in sim with reinforcement learning",
  },
  {
    title: "🗺️ Visual SLAM",
    href: "/projects/ros-vslam",
    description: "Learn how robots can localize & map unknown worlds visually",
  },
  {
    title: "💭 Co-op Planning",
    href: "/projects/robot-transformers",
    description: "Train robots to plan and cooperatively manipulate objects",
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
    title: "📖 SLAM Overview",
    href: "/notes/slam-sota",
    description: "Review of recent research in localization & mapping",
  },
  {
    title: "🧭 Autonomous Navigation",
    href: "/notes/auto-nav",
    description: "Review of recent research in autonomous navigation",
  },
  {
    title: "🐦 Birds Eye View",
    href: "/notes/bev",
    description:
      "Review of recent research in Birds Eye View (BEV) for sensor fusion",
  },
  {
    title: "🪐 Planetary Exploration",
    href: "/notes/exploration",
    description: "Review of recent research in planetary exploration robotics",
  },
];
const components3: componentType[] = [
  {
    title: "📖 SLAM Overview",
    href: "/notes/slam-sota",
    description: "Review of recent research in localization & mapping",
  },
  {
    title: "🧭 Autonomous Navigation",
    href: "/notes/auto-nav",
    description: "Review of recent research in autonomous navigation",
  },
  {
    title: "🐦 Birds Eye View",
    href: "/notes/bev",
    description:
      "Review of recent research in Birds Eye View (BEV) for sensor fusion",
  },
  {
    title: "🪐 Planetary Exploration",
    href: "/notes/exploration",
    description: "Review of recent research in planetary exploration robotics",
  },
];
function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[250px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
              <a href="/projects">
                <Button variant={"ghost"} className="text-sm font-medium">
                  View All Projects
                </Button>
              </a>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
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
                View All Guides
              </Button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Notes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[250px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
    <header className="fixed w-full z-30 bg-opacity-90 bg-gray-100 shadow-md shadow-slate-200">
      <div className="max-w-6xl mx-auto px-1 md:px-5 sm:px-6">
        <div className="flex items-center justify-between h-12 md:h-16 text-gray-700">
          <a href="/" className="">
            <Button
              variant={"outline"}
              className="bg-gray-100 hover:bg-white gap-1"
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
          </div>
        </div>
      </div>
    </header>
  );
}
