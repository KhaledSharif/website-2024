import '@testing-library/jest-dom'

// Configure React testing environment
global.IS_REACT_ACT_ENVIRONMENT = true

// Suppress React 18 act warnings and Radix UI accessibility warnings in tests
const originalError = console.error
const originalWarn = console.warn
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('act(...)')) {
      return
    }
    originalError.call(console, ...args)
  }
  
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && (
      args[0].includes('Missing `Description`') || 
      args[0].includes('aria-describedby={undefined}')
    )) {
      return
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock AOS
jest.mock('aos', () => ({
  init: jest.fn(),
}))

// Mock phosphor icons
jest.mock('@phosphor-icons/react', () => ({
  GithubLogo: () => <div data-testid="github-icon" />,
  LinkedinLogo: () => <div data-testid="linkedin-icon" />,
  FilePdf: () => <div data-testid="pdf-icon" />,
  MagnifyingGlass: () => <div data-testid="search-icon" />,
  PlayCircle: () => <div data-testid="play-icon" />,
  FolderOpen: () => <div data-testid="folder-icon" />,
  FileText: () => <div data-testid="file-icon" />,
  ArrowUpRight: () => <div data-testid="arrow-icon" />,
}))

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})) 