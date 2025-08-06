import React from 'react'
import { render, screen } from '@testing-library/react'
import PageLayout from '@/components/page-layout'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

// Mock react-markdown
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="markdown">{children}</div>,
}))

// Mock remark-gfm
jest.mock('remark-gfm', () => ({
  __esModule: true,
  default: () => () => {},
}))

// Mock UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: any) => (
    <div className={className} data-testid="card">{children}</div>
  ),
  CardContent: ({ children }: any) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardDescription: ({ children }: any) => (
    <div data-testid="card-description">{children}</div>
  ),
  CardHeader: ({ children }: any) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: any) => (
    <h1 data-testid="card-title">{children}</h1>
  ),
}))

jest.mock('@/components/ui/breadcrumb', () => ({
  Breadcrumb: ({ children }: any) => (
    <nav data-testid="breadcrumb">{children}</nav>
  ),
  BreadcrumbItem: ({ children }: any) => (
    <span data-testid="breadcrumb-item">{children}</span>
  ),
  BreadcrumbLink: ({ children, href }: any) => (
    <a href={href} data-testid="breadcrumb-link">{children}</a>
  ),
  BreadcrumbList: ({ children }: any) => (
    <ol data-testid="breadcrumb-list">{children}</ol>
  ),
  BreadcrumbPage: ({ children }: any) => (
    <span data-testid="breadcrumb-page">{children}</span>
  ),
  BreadcrumbSeparator: () => (
    <span data-testid="breadcrumb-separator">/</span>
  ),
}))

describe('PageLayout Component', () => {
  const mockProps = {
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
      { label: 'Current Page' },
    ],
    title: 'Test Page Title',
    description: 'Test page description',
  }

  it('should render basic layout structure', () => {
    render(<PageLayout {...mockProps} />)
    
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByTestId('card-header')).toBeInTheDocument()
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
  })

  it('should render breadcrumbs correctly', () => {
    render(<PageLayout {...mockProps} />)
    
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
    expect(screen.getByTestId('breadcrumb-list')).toBeInTheDocument()
    
    // Check breadcrumb links
    const links = screen.getAllByTestId('breadcrumb-link')
    expect(links[0]).toHaveAttribute('href', '/')
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Current Page')).toBeInTheDocument()
    
    // Should have separators between items
    const separators = screen.getAllByTestId('breadcrumb-separator')
    expect(separators).toHaveLength(2) // 3 items = 2 separators
  })

  it('should render title and description', () => {
    render(<PageLayout {...mockProps} />)
    
    expect(screen.getByTestId('card-title')).toHaveTextContent('Test Page Title')
    expect(screen.getByTestId('card-description')).toHaveTextContent('Test page description')
  })

  it('should render title with icon when provided', () => {
    const propsWithIcon = {
      ...mockProps,
      titleIcon: '🚀',
    }
    
    render(<PageLayout {...propsWithIcon} />)
    
    expect(screen.getByTestId('card-title')).toHaveTextContent('🚀 Test Page Title')
  })

  it('should render header image when provided', () => {
    const propsWithImage = {
      ...mockProps,
      headerImage: {
        src: '/test-image.jpg',
        alt: 'Test image alt text',
      },
    }
    
    render(<PageLayout {...propsWithImage} />)
    
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    expect(image).toHaveAttribute('alt', 'Test image alt text')
    expect(image).toHaveAttribute('width', '800')
    expect(image).toHaveAttribute('height', '400')
    expect(image).toHaveClass('max-w-full', 'h-auto')
  })

  it('should not render header image when not provided', () => {
    render(<PageLayout {...mockProps} />)
    
    const images = screen.queryAllByRole('img')
    expect(images).toHaveLength(0)
  })

  it('should render header image with correct container styling', () => {
    const propsWithImage = {
      ...mockProps,
      headerImage: {
        src: '/test-image.jpg',
        alt: 'Test image alt text',
      },
    }
    
    render(<PageLayout {...propsWithImage} />)
    
    const imageContainer = screen.getByRole('img').closest('div')
    expect(imageContainer).toHaveClass('flex', 'w-full', 'items-center', 'justify-center', 'pb-8')
  })

  it('should handle header image with different file types', () => {
    const testCases = [
      { src: '/image.png', alt: 'PNG image' },
      { src: '/image.jpg', alt: 'JPG image' },
      { src: '/image.webp', alt: 'WebP image' },
      { src: '/image.svg', alt: 'SVG image' },
    ]

    testCases.forEach(({ src, alt }) => {
      const { unmount } = render(
        <PageLayout
          {...mockProps}
          headerImage={{ src, alt }}
        />
      )
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', src)
      expect(image).toHaveAttribute('alt', alt)
      expect(image).toHaveAttribute('width', '800')
      expect(image).toHaveAttribute('height', '400')
      
      unmount()
    })
  })

  it('should render header image with empty alt text', () => {
    const propsWithImage = {
      ...mockProps,
      headerImage: {
        src: '/test-image.jpg',
        alt: '',
      },
    }
    
    render(<PageLayout {...propsWithImage} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', '')
    expect(image).toHaveAttribute('width', '800')
    expect(image).toHaveAttribute('height', '400')
  })

  it('should integrate correctly with Next.js Image component properties', () => {
    const propsWithImage = {
      ...mockProps,
      headerImage: {
        src: '/images/nerf.png',
        alt: 'NeRF visualization',
      },
    }
    
    render(<PageLayout {...propsWithImage} />)
    
    const image = screen.getByRole('img')
    // Test that all required Next.js Image properties are present
    expect(image).toHaveAttribute('src', '/images/nerf.png')
    expect(image).toHaveAttribute('alt', 'NeRF visualization')
    expect(image).toHaveAttribute('width', '800')
    expect(image).toHaveAttribute('height', '400')
    expect(image).toHaveClass('max-w-full', 'h-auto')
    
    // Test that the container has proper styling
    const imageContainer = image.closest('div')
    expect(imageContainer).toHaveClass('flex', 'w-full', 'items-center', 'justify-center', 'pb-8')
  })

  it('should handle header image with different aspect ratios', () => {
    const testCases = [
      { src: '/wide-image.jpg', alt: 'Wide image', expectedWidth: '800', expectedHeight: '400' },
      { src: '/square-image.png', alt: 'Square image', expectedWidth: '800', expectedHeight: '400' },
      { src: '/tall-image.webp', alt: 'Tall image', expectedWidth: '800', expectedHeight: '400' },
    ]

    testCases.forEach(({ src, alt, expectedWidth, expectedHeight }) => {
      const { unmount } = render(
        <PageLayout
          {...mockProps}
          headerImage={{ src, alt }}
        />
      )
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', src)
      expect(image).toHaveAttribute('alt', alt)
      expect(image).toHaveAttribute('width', expectedWidth)
      expect(image).toHaveAttribute('height', expectedHeight)
      expect(image).toHaveClass('max-w-full', 'h-auto')
      
      unmount()
    })
  })

  it('should ensure header image is responsive with CSS classes', () => {
    const propsWithImage = {
      ...mockProps,
      headerImage: {
        src: '/test-image.jpg',
        alt: 'Test image',
      },
    }
    
    render(<PageLayout {...propsWithImage} />)
    
    const image = screen.getByRole('img')
    // max-w-full ensures the image doesn't overflow its container
    expect(image).toHaveClass('max-w-full')
    // h-auto maintains aspect ratio
    expect(image).toHaveClass('h-auto')
  })

  it('should render children when provided', () => {
    render(
      <PageLayout {...mockProps}>
        <div data-testid="custom-children">Custom child content</div>
      </PageLayout>
    )
    
    expect(screen.getByTestId('custom-children')).toBeInTheDocument()
    expect(screen.getByText('Custom child content')).toBeInTheDocument()
  })

  it('should render markdown content when provided', () => {
    const propsWithMarkdown = {
      ...mockProps,
      markdownContent: '# This is a markdown heading\n\nSome paragraph content.',
    }
    
    render(<PageLayout {...propsWithMarkdown} />)
    
    expect(screen.getByTestId('markdown')).toBeInTheDocument()
    expect(screen.getByTestId('markdown')).toHaveTextContent('# This is a markdown heading')
  })

  it('should render additional content when provided', () => {
    const propsWithAdditional = {
      ...mockProps,
      additionalContent: <div data-testid="additional-content">Additional content here</div>,
    }
    
    render(<PageLayout {...propsWithAdditional} />)
    
    expect(screen.getByTestId('additional-content')).toBeInTheDocument()
    expect(screen.getByText('Additional content here')).toBeInTheDocument()
  })

  it('should render single breadcrumb without separator', () => {
    const propsWithSingleBreadcrumb = {
      ...mockProps,
      breadcrumbs: [{ label: 'Single Page' }],
    }
    
    render(<PageLayout {...propsWithSingleBreadcrumb} />)
    
    expect(screen.getByText('Single Page')).toBeInTheDocument()
    expect(screen.queryByTestId('breadcrumb-separator')).not.toBeInTheDocument()
  })

  it('should render breadcrumb page for last item', () => {
    render(<PageLayout {...mockProps} />)
    
    expect(screen.getByTestId('breadcrumb-page')).toHaveTextContent('Current Page')
  })

  it('should render breadcrumb links for non-last items', () => {
    render(<PageLayout {...mockProps} />)
    
    const links = screen.getAllByTestId('breadcrumb-link')
    expect(links).toHaveLength(2) // First two items should be links
    expect(links[0]).toHaveAttribute('href', '/')
    expect(links[1]).toHaveAttribute('href', '/projects')
  })

  it('should apply correct CSS classes', () => {
    render(<PageLayout {...mockProps} />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('relative')
    
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('pt-4')
  })

  it('should render all components together', () => {
    const fullProps = {
      ...mockProps,
      titleIcon: '📄',
      headerImage: {
        src: '/header.jpg',
        alt: 'Header image',
      },
      markdownContent: '## Test markdown',
      additionalContent: <div data-testid="extra">Extra content</div>,
    }
    
    render(
      <PageLayout {...fullProps}>
        <div data-testid="children">Child content</div>
      </PageLayout>
    )
    
    // All elements should be present
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
    expect(screen.getByTestId('card-title')).toHaveTextContent('📄 Test Page Title')
    expect(screen.getByTestId('card-description')).toHaveTextContent('Test page description')
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByTestId('children')).toBeInTheDocument()
    expect(screen.getByTestId('markdown')).toBeInTheDocument()
    expect(screen.getByTestId('extra')).toBeInTheDocument()
  })

  it('should handle empty breadcrumbs array', () => {
    const propsWithEmptyBreadcrumbs = {
      ...mockProps,
      breadcrumbs: [],
    }
    
    render(<PageLayout {...propsWithEmptyBreadcrumbs} />)
    
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
    expect(screen.getByTestId('breadcrumb-list')).toBeInTheDocument()
    expect(screen.queryByTestId('breadcrumb-item')).not.toBeInTheDocument()
  })
})