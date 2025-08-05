export interface Note {
  slug: string;
  name: string;
  description: string;
  title: string;
  titleIcon: string;
  breadcrumbLabel: string;
  hasHeaderImage?: boolean;
  headerImageSrc?: string;
  headerImageAlt?: string;
}

export const notes: Note[] = [
  {
    slug: "slam-sota",
    name: "SLAM Overview",
    description: "Recent research related to simultaneous localization and mapping",
    title: "SLAM Overview",
    titleIcon: "📖",
    breadcrumbLabel: "SLAM Overview"
  },
  {
    slug: "auto-nav",
    name: "Autonomous Navigation",
    description: "Overview of state of the art in autonomous robot navigation",
    title: "Autonomous Navigation",
    titleIcon: "🧭",
    breadcrumbLabel: "Autonomous Navigation",
    hasHeaderImage: true,
    headerImageSrc: "/images/auto-nav.jpg",
    headerImageAlt: "robots"
  },
  {
    slug: "bev",
    name: "Birds Eye View",
    description: "Introduction to birds eye view perception for robotics",
    title: "Birds Eye View",
    titleIcon: "🐦",
    breadcrumbLabel: "Birds Eye View"
  },
  {
    slug: "nerfs",
    name: "Neural Radiance Fields",
    description: "Introduction to NeRFs and their uses in robotics",
    title: "Neural Radiance Fields (NeRFs)",
    titleIcon: "🪐",
    breadcrumbLabel: "NeRFs",
    hasHeaderImage: true,
    headerImageSrc: "/images/nerf.png",
    headerImageAlt: "robots"
  }
];

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find(note => note.slug === slug);
}

export function getAllNotes(): Note[] {
  return notes;
} 