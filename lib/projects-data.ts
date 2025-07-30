export interface Project {
  slug: string;
  name: string;
  description: string;
  title: string;
  titleIcon: string;
  breadcrumbLabel: string;
  sourceCodeUrl?: string;
  hasVideo?: boolean;
  hasCarousel?: boolean;
  hasAccordion?: boolean;
  hasAnimatedBeam?: boolean;
  carouselItems?: Array<{
    img: string;
    desc: string;
  }>;
}

export const projects: Project[] = [
  {
    slug: "astrobee",
    name: "🐝 Astrobee",
    description: "This project goes over the Computer Vision (C++) code for new robots (Astrobees) working alongside astronauts on the International Space Station (ISS)",
    title: "Astrobee",
    titleIcon: "🐝",
    breadcrumbLabel: "Astrobee",
    sourceCodeUrl: "https://github.com/nasa/astrobee",
    hasCarousel: true,
    carouselItems: [
      {
        img: "/images/astrobee-001.jpg",
        desc: "An Astrobee (Bumble) attached to 1 of 2 ports on the charging dock"
      },
      {
        img: "/images/astrobee-002.webp",
        desc: "Expedition 63 Commander Chris Cassidy with two Astrobees (Bumble & Honey)"
      },
      {
        img: "/images/astrobee-005.jpg",
        desc: "Each Astrobee has 3 cameras on its front: Nav, Sci, & Haz cams"
      },
      {
        img: "/images/astrobee-004.jpg",
        desc: "Astrobee (Bumble) flying autonomously during a mapping session"
      }
    ]
  },
  {
    slug: "ros-vslam",
    name: "🗺️ Visual SLAM",
    description: "This project has code for running Visual SLAM in the Robot Operating System (ROS) with GPU acceleration and testing in a ray traced simulation",
    title: "Visual SLAM",
    titleIcon: "🗺️",
    breadcrumbLabel: "Visual SLAM",
    sourceCodeUrl: "https://github.com/khaledsharif/ros-vslam",
    hasAccordion: true,
    hasAnimatedBeam: true
  },
  {
    slug: "omniverse-gym",
    name: "🦾 Omniverse Gym",
    description: "This project shows how to use NVIDIA Omniverse Isaac Simulator to solve robot reinforcement learning tasks using Proximal Policy Optimization (PPO)",
    title: "Omniverse Gym",
    titleIcon: "🦾",
    breadcrumbLabel: "Omniverse Gym",
    sourceCodeUrl: "https://github.com/khaledsharif/omniverse-gym",
    hasVideo: true
  },
  {
    slug: "robot-transformers",
    name: "💭 Robot Transformers",
    description: "This project trains and evaluates an Action Chunking Transformer (ACT) for coordinated robot manipulation using HuggingFace LeRobot library",
    title: "Robot Transformers",
    titleIcon: "💭",
    breadcrumbLabel: "Robot Transformers",
    sourceCodeUrl: "https://github.com/khaledsharif/robot-transformers",
    hasVideo: true
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
} 