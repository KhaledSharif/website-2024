export interface SearchItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'project' | 'note' | 'gallery';
  tags: string[];
  emoji: string;
}

export const searchData: SearchItem[] = [
  // Projects
  {
    id: 'astrobee',
    title: 'Astrobee',
    description: 'Computer Vision (C++) code for new robots (Astrobees) working alongside astronauts on the International Space Station (ISS)',
    url: '/projects/astrobee',
    category: 'project',
    tags: ['computer vision', 'cpp', 'robotics', 'space', 'iss', 'astronauts', 'free-flying robots'],
    emoji: '🐝'
  },
  {
    id: 'ros-vslam',
    title: 'Visual SLAM',
    description: 'Code for running Visual SLAM in the Robot Operating System (ROS) with GPU acceleration and testing in a ray traced simulation',
    url: '/projects/ros-vslam',
    category: 'project',
    tags: ['slam', 'visual slam', 'ros', 'gpu', 'localization', 'mapping', 'simulation', 'ray tracing'],
    emoji: '🗺️'
  },
  {
    id: 'omniverse-gym',
    title: 'Omniverse Gym',
    description: 'NVIDIA Omniverse Isaac Simulator to solve robot reinforcement learning tasks using Proximal Policy Optimization (PPO)',
    url: '/projects/omniverse-gym',
    category: 'project',
    tags: ['reinforcement learning', 'nvidia', 'omniverse', 'isaac simulator', 'ppo', 'robot training', 'simulation'],
    emoji: '🦾'
  },
  {
    id: 'robot-transformers',
    title: 'Robot Transformers',
    description: 'Action Chunking Transformer (ACT) for coordinated robot manipulation using HuggingFace LeRobot library',
    url: '/projects/robot-transformers',
    category: 'project',
    tags: ['transformer', 'act', 'huggingface', 'lerobot', 'manipulation', 'coordination', 'neural networks'],
    emoji: '💭'
  },
  
  // Notes
  {
    id: 'slam-sota',
    title: 'SLAM Overview',
    description: 'Recent research related to simultaneous localization and mapping',
    url: '/notes/slam-sota',
    category: 'note',
    tags: ['slam', 'localization', 'mapping', 'research', 'state of the art', 'computer vision'],
    emoji: '📖'
  },
  {
    id: 'auto-nav',
    title: 'Autonomous Navigation',
    description: 'Overview of state of the art in autonomous robot navigation',
    url: '/notes/auto-nav',
    category: 'note',
    tags: ['autonomous navigation', 'robotics', 'path planning', 'obstacle avoidance', 'research'],
    emoji: '🧭'
  },
  {
    id: 'bev',
    title: 'Birds Eye View',
    description: 'Introduction to birds eye view perception for robotics',
    url: '/notes/bev',
    category: 'note',
    tags: ['bev', 'birds eye view', 'perception', 'sensor fusion', 'robotics', 'computer vision'],
    emoji: '🐦'
  },
  {
    id: 'nerfs',
    title: 'Neural Radiance Fields',
    description: 'Introduction to NeRFs and their uses in robotics',
    url: '/notes/nerfs',
    category: 'note',
    tags: ['nerf', 'neural radiance fields', '3d reconstruction', 'novel view synthesis', 'robotics'],
    emoji: '🪐'
  }
];

export function searchItems(query: string): SearchItem[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return [];
  
  return searchData.filter(item => {
    const searchableText = [
      item.title.toLowerCase(),
      item.description.toLowerCase(),
      ...item.tags.map(tag => tag.toLowerCase())
    ].join(' ');
    
    return searchableText.includes(normalizedQuery);
  }).sort((a, b) => {
    // Prioritize exact title matches
    const aTitleMatch = a.title.toLowerCase().includes(normalizedQuery);
    const bTitleMatch = b.title.toLowerCase().includes(normalizedQuery);
    
    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;
    
    // Then prioritize projects over notes
    if (a.category === 'project' && b.category === 'note') return -1;
    if (a.category === 'note' && b.category === 'project') return 1;
    
    return 0;
  });
} 