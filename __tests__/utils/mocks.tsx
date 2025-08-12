import React from 'react';

// Next.js mocks
export const nextImageMock = () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
});

export const nextLinkMock = () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
});

// React Markdown mocks
export const reactMarkdownMock = () => {
  return function MockMarkdown({ children }: { children: string }) {
    return <div>{children}</div>;
  };
};

export const remarkGfmMock = () => () => {};

// Phosphor Icons mocks
export const phosphorIconsMock = () => ({
  ArrowSquareOut: () => <span>ArrowSquareOut</span>,
  CaretCircleDown: () => <span>CaretCircleDown</span>,
  CaretCircleUp: () => <span>CaretCircleUp</span>,
  GithubLogo: () => <span>GithubLogo</span>,
  LinkedinLogo: () => <span>LinkedinLogo</span>,
  FilePdf: () => <span>FilePdf</span>,
  MagnifyingGlass: () => <span>MagnifyingGlass</span>,
  X: () => <span>X</span>,
  House: () => <span>House</span>,
  FolderOpen: () => <span>FolderOpen</span>,
  Notebook: () => <span>Notebook</span>,
  Plus: () => <span>Plus</span>,
  ArchiveBox: () => <span>ArchiveBox</span>,
  Moon: () => <span>Moon</span>,
  Sun: () => <span>Sun</span>,
  List: () => <span>List</span>,
  PlayCircle: () => <span>PlayCircle</span>,
});

// Lucide React mocks
export const lucideReactMock = () => ({
  ChevronRight: () => <span>ChevronRight</span>,
  ChevronLeft: () => <span>ChevronLeft</span>,
  ChevronDown: () => <span>ChevronDown</span>,
  MoreHorizontal: () => <span>MoreHorizontal</span>,
  Slash: () => <span>Slash</span>,
  X: () => <span>X</span>,
});

// Headless UI mocks
export const headlessUIMock = () => ({
  Transition: Object.assign(
    ({ children, show }: any) => show ? <>{children}</> : null,
    { 
      Child: ({ children }: any) => <>{children}</>,
      Root: ({ children, show }: any) => show ? <>{children}</> : null,
    }
  ),
  Dialog: Object.assign(
    ({ children, open }: any) => open ? <div>{children}</div> : null,
    { 
      Panel: ({ children }: any) => <div>{children}</div>,
      Title: ({ children }: any) => <div>{children}</div>,
      Description: ({ children }: any) => <div>{children}</div>,
    }
  ),
});

// Framer Motion mocks
export const framerMotionMock = () => ({
  motion: {
    linearGradient: ({ children, ...props }: any) => (
      <linearGradient data-testid="motion-gradient" {...props}>
        {children}
      </linearGradient>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
});

// Data mocks
export const projectsDataMock = () => ({
  getAllProjects: () => [
    {
      slug: 'test-project',
      name: 'Test Project',
      titleIcon: '🚀',
      description: 'Test description',
    },
  ],
  getProjectBySlug: (slug: string) => ({
    slug,
    name: 'Test Project',
    titleIcon: '🚀',
    description: 'Test description',
    markdownContent: '# Test Content',
  }),
});

export const notesDataMock = () => ({
  getAllNotes: () => [
    {
      slug: 'test-note',
      name: 'Test Note',
      titleIcon: '📝',
      description: 'Test description',
    },
  ],
  getNoteBySlug: (slug: string) => ({
    slug,
    name: 'Test Note',
    titleIcon: '📝',
    description: 'Test description',
    markdownContent: '# Test Content',
  }),
});

// ResizeObserver mock
export const resizeObserverMock = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Setup all common mocks
export const setupCommonMocks = () => {
  jest.mock('next/image', nextImageMock);
  jest.mock('next/link', nextLinkMock);
  jest.mock('react-markdown', reactMarkdownMock);
  jest.mock('remark-gfm', remarkGfmMock);
  jest.mock('@phosphor-icons/react', phosphorIconsMock);
  jest.mock('lucide-react', lucideReactMock);
  jest.mock('@headlessui/react', headlessUIMock);
  jest.mock('framer-motion', framerMotionMock);
  jest.mock('@/lib/projects-data', projectsDataMock);
  jest.mock('@/lib/notes-data', notesDataMock);
  global.ResizeObserver = resizeObserverMock;
};

// Clean up all mocks
export const cleanupMocks = () => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
};