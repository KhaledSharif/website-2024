import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/ui/header'

// Mock dependencies
jest.mock('@/components/ui/navigation-menu', () => ({
  NavigationMenu: ({ children }: any) => <nav data-testid="navigation-menu">{children}</nav>,
  NavigationMenuContent: ({ children }: any) => <div data-testid="nav-content">{children}</div>,
  NavigationMenuItem: ({ children }: any) => <div data-testid="nav-item">{children}</div>,
  NavigationMenuLink: ({ children, asChild }: any) => asChild ? children : <a data-testid="nav-link">{children}</a>,
  NavigationMenuList: ({ children }: any) => <ul data-testid="nav-list">{children}</ul>,
  NavigationMenuTrigger: ({ children }: any) => <button data-testid="nav-trigger">{children}</button>,
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, className, onClick, ...props }: any) => (
    <button 
      className={`button-${variant} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
}))

jest.mock('@/components/search-sheet', () => ({
  SearchSheet: () => <div data-testid="search-sheet">Search Sheet</div>,
}))

jest.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('Header Component', () => {
  beforeEach(() => {
    localStorageMock.setItem.mockClear()
    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: {
          contains: jest.fn(() => false),
          add: jest.fn(),
          remove: jest.fn(),
        }
      },
      configurable: true,
    })
  })

  it('should render header element', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('fixed', 'w-full', 'z-30')
  })

  it('should render home/logo button', () => {
    render(<Header />)
    
    const logoButton = screen.getByText('👦🏻')
    expect(logoButton).toBeInTheDocument()
    
    const homeLink = logoButton.closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
    
    const nameText = screen.getByText('Khaled S.')
    expect(nameText).toBeInTheDocument()
  })

  it('should render navigation menu', () => {
    render(<Header />)
    
    expect(screen.getByTestId('navigation-menu')).toBeInTheDocument()
  })

  it('should render search sheet', () => {
    render(<Header />)
    
    expect(screen.getByTestId('search-sheet')).toBeInTheDocument()
  })

  it('should render theme toggle button', () => {
    render(<Header />)
    
    const themeButton = screen.getByLabelText('Toggle dark mode')
    expect(themeButton).toBeInTheDocument()
    expect(themeButton).toHaveClass('button-ghost')
  })

  it('should show light mode icon by default', () => {
    render(<Header />)
    
    expect(screen.getByText('☀️')).toBeInTheDocument()
  })

  it('should show dark mode icon when dark mode is active', () => {
    // Mock dark mode active
    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: {
          contains: jest.fn(() => true),
          add: jest.fn(),
          remove: jest.fn(),
        }
      },
      configurable: true,
    })
    
    render(<Header />)
    
    expect(screen.getByText('🌙')).toBeInTheDocument()
  })

  it('should toggle theme when theme button is clicked', async () => {
    const user = userEvent.setup()
    const mockClassList = {
      contains: jest.fn(() => false),
      add: jest.fn(),
      remove: jest.fn(),
    }

    Object.defineProperty(document, 'documentElement', {
      value: { classList: mockClassList },
      configurable: true,
    })

    render(<Header />)
    
    const themeButton = screen.getByLabelText('Toggle dark mode')
    
    await act(async () => {
      await user.click(themeButton)
    })
    
    expect(mockClassList.add).toHaveBeenCalledWith('dark')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('should toggle from dark to light mode', async () => {
    const user = userEvent.setup()
    const mockClassList = {
      contains: jest.fn(() => true), // Start in dark mode
      add: jest.fn(),
      remove: jest.fn(),
    }

    Object.defineProperty(document, 'documentElement', {
      value: { classList: mockClassList },
      configurable: true,
    })

    render(<Header />)
    
    const themeButton = screen.getByLabelText('Toggle dark mode')
    
    await act(async () => {
      await user.click(themeButton)
    })
    
    expect(mockClassList.remove).toHaveBeenCalledWith('dark')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
  })

  it('should have correct layout structure', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    const container = header.querySelector('.max-w-6xl')
    expect(container).toBeInTheDocument()
    
    const flexContainer = container?.querySelector('.flex.items-center.justify-between')
    expect(flexContainer).toBeInTheDocument()
  })

  it('should render home button with correct classes', () => {
    render(<Header />)
    
    const homeButton = screen.getByText('👦🏻').closest('button')
    expect(homeButton).toHaveClass('button-outline')
    expect(homeButton).toHaveClass('bg-muted', 'hover:bg-background', 'gap-1')
  })

  it('should have responsive name text', () => {
    render(<Header />)
    
    const nameText = screen.getByText('Khaled S.')
    expect(nameText).toHaveClass('hidden', 'sm:block')
  })

  it('should initialize dark mode state on mount', () => {
    const mockClassList = {
      contains: jest.fn(() => true),
      add: jest.fn(),
      remove: jest.fn(),
    }

    Object.defineProperty(document, 'documentElement', {
      value: { classList: mockClassList },
      configurable: true,
    })

    render(<Header />)
    
    expect(mockClassList.contains).toHaveBeenCalledWith('dark')
  })
})

describe('NavigationMenuDemo Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
  })

  it('should render navigation menu with projects trigger', () => {
    render(<Header />)
    
    const projectsTrigger = screen.getByText('Projects')
    expect(projectsTrigger).toBeInTheDocument()
  })

  it('should render navigation menu with notes trigger', () => {
    render(<Header />)
    
    const notesTrigger = screen.getByText('Notes')
    expect(notesTrigger).toBeInTheDocument()
  })

  it('should render view all projects button', () => {
    render(<Header />)
    
    const viewAllButton = screen.getByText('View All Projects')
    expect(viewAllButton).toBeInTheDocument()
    expect(viewAllButton.closest('a')).toHaveAttribute('href', '/projects')
  })

  it('should render view all notes button', () => {
    render(<Header />)
    
    const viewAllButton = screen.getByText('View All Notes')
    expect(viewAllButton).toBeInTheDocument()
    expect(viewAllButton.closest('a')).toHaveAttribute('href', '/notes')
  })
})

describe('ListItem Component', () => {
  it('should render list items in navigation content', () => {
    render(<Header />)
    
    // Check for some of the navigation items that should be rendered
    expect(screen.getByText('🐝 Astrobee')).toBeInTheDocument()
    expect(screen.getByText('🗺️ Visual SLAM')).toBeInTheDocument()
    expect(screen.getByText('📖 SLAM Overview')).toBeInTheDocument()
    expect(screen.getByText('🧭 Autonomous Navigation')).toBeInTheDocument()
  })

  it('should render project descriptions', () => {
    render(<Header />)
    
    expect(screen.getByText(/Computer Vision \(C\+\+\) code for new robots/)).toBeInTheDocument()
    expect(screen.getByText(/code for running Visual SLAM in the Robot Operating System/)).toBeInTheDocument()
  })

  it('should render note descriptions', () => {
    render(<Header />)
    
    expect(screen.getByText(/Recent research related to simultaneous localization and mapping/)).toBeInTheDocument()
    expect(screen.getByText(/Overview of state of the art in autonomous robot navigation/)).toBeInTheDocument()
  })
})