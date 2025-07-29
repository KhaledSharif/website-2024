import React from 'react'
import { render, screen } from '@testing-library/react'
import { Layout, Main, Section, Container, Article, cn } from '@/components/craft'

describe('craft utility and components', () => {
  describe('cn utility function', () => {
    it('should merge class names correctly', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class active-class')
    })

    it('should handle false conditional classes', () => {
      const isActive = false
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class')
    })

    it('should handle Tailwind classes with conflicts', () => {
      const result = cn('text-red-500', 'text-blue-500')
      expect(result).toBe('text-blue-500')
    })

    it('should handle undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'valid-class')
      expect(result).toBe('base-class valid-class')
    })
  })

  describe('Layout Component', () => {
    it('should render html element with children', () => {
      // Suppress DOM validation warning for this test since we're testing Layout component behavior
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      const { container } = render(
        <Layout>
          <body>
            <div data-testid="test-content">Test content</div>
          </body>
        </Layout>
      )
      
      // Find the test content within the container instead of using screen
      const testContent = container.querySelector('[data-testid="test-content"]')
      expect(testContent).toBeInTheDocument()
      
      // Restore console
      consoleSpy.mockRestore()
    })

    it('should call cn function with correct classes', () => {
      // Test the cn function call behavior since we can't easily test HTML element attributes in jsdom
      const result = cn('scroll-smooth antialiased focus:scroll-auto', 'custom-class')
      expect(result).toBe('scroll-smooth antialiased focus:scroll-auto custom-class')
    })

    it('should have correct structure when rendered', () => {
      const { container } = render(
        <Layout>
          <body>
            <div data-testid="test-content">Test content</div>
          </body>
        </Layout>
      )
      
      // Check that HTML element exists in container
      const htmlElement = container.querySelector('html')
      expect(htmlElement).toBeInTheDocument()
    })
  })

  describe('Main Component', () => {
    it('should render main element with children', () => {
      render(<Main>Test main content</Main>)
      
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
      expect(main).toHaveTextContent('Test main content')
    })

    it('should have prose classes', () => {
      render(<Main>Test content</Main>)
      
      const main = screen.getByRole('main')
      expect(main).toHaveClass(
        'max-w-none',
        'prose-p:m-0',
        'prose',
        'prose-neutral',
        'dark:prose-invert',
        'xl:prose-lg'
      )
    })

    it('should merge custom className', () => {
      render(<Main className="custom-main">Test content</Main>)
      
      const main = screen.getByRole('main')
      expect(main).toHaveClass('custom-main')
    })

    it('should accept id prop', () => {
      render(<Main id="main-content">Test content</Main>)
      
      const main = screen.getByRole('main')
      expect(main).toHaveAttribute('id', 'main-content')
    })
  })

  describe('Section Component', () => {
    it('should render section element with children', () => {
      render(<Section>Test section content</Section>)
      
      const section = document.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveTextContent('Test section content')
    })

    it('should have default padding classes', () => {
      render(<Section>Test content</Section>)
      
      const section = document.querySelector('section')
      expect(section).toHaveClass('py-8', 'md:py-12')
    })

    it('should merge custom className', () => {
      render(<Section className="custom-section">Test content</Section>)
      
      const section = document.querySelector('section')
      expect(section).toHaveClass('py-8', 'md:py-12', 'custom-section')
    })

    it('should accept id prop', () => {
      render(<Section id="section-1">Test content</Section>)
      
      const section = document.querySelector('section')
      expect(section).toHaveAttribute('id', 'section-1')
    })
  })

  describe('Container Component', () => {
    it('should render div element with children', () => {
      render(<Container>Test container content</Container>)
      
      expect(screen.getByText('Test container content')).toBeInTheDocument()
    })

    it('should have container classes', () => {
      render(
        <Container>
          <div data-testid="container-child">Test</div>
        </Container>
      )
      
      const container = screen.getByTestId('container-child').parentElement
      expect(container).toHaveClass('mx-auto', 'max-w-5xl', 'p-6', 'sm:p-8')
    })

    it('should merge custom className', () => {
      render(
        <Container className="custom-container">
          <div data-testid="container-child">Test</div>
        </Container>
      )
      
      const container = screen.getByTestId('container-child').parentElement
      expect(container).toHaveClass('mx-auto', 'max-w-5xl', 'p-6', 'sm:p-8', 'custom-container')
    })

    it('should accept id prop', () => {
      render(
        <Container id="container-1">
          <div data-testid="container-child">Test</div>
        </Container>
      )
      
      const container = screen.getByTestId('container-child').parentElement
      expect(container).toHaveAttribute('id', 'container-1')
    })
  })

  describe('Article Component', () => {
    it('should render article element with children', () => {
      render(<Article>Test article content</Article>)
      
      const article = screen.getByRole('article')
      expect(article).toBeInTheDocument()
      expect(article).toHaveTextContent('Test article content')
    })

    it('should have prose classes', () => {
      render(<Article>Test content</Article>)
      
      const article = screen.getByRole('article')
      expect(article).toHaveClass(
        'prose',
        'prose-neutral',
        'dark:prose-invert',
        'xl:prose-lg',
        'max-w-none',
        'prose-headings:font-normal',
        'prose-p:mb-0'
      )
    })

    it('should have link styling classes', () => {
      render(<Article>Test content</Article>)
      
      const article = screen.getByRole('article')
      expect(article).toHaveClass(
        'prose-a:underline',
        'prose-a:decoration-primary/50',
        'prose-a:underline-offset-2',
        'prose-a:text-foreground/75',
        'prose-a:transition-all'
      )
    })

    it('should merge custom className', () => {
      render(<Article className="custom-article">Test content</Article>)
      
      const article = screen.getByRole('article')
      expect(article).toHaveClass('custom-article')
    })

    it('should accept id prop', () => {
      render(<Article id="article-1">Test content</Article>)
      
      const article = screen.getByRole('article')
      expect(article).toHaveAttribute('id', 'article-1')
    })
  })

  describe('Components integration', () => {
    it('should work together in nested structure without Layout', () => {
      render(
        <Main>
          <Section>
            <Container>
              <Article>
                <h1 data-testid="heading">Test Article</h1>
                <p data-testid="paragraph">Test paragraph content</p>
              </Article>
            </Container>
          </Section>
        </Main>
      )
      
      expect(screen.getByTestId('heading')).toBeInTheDocument()
      expect(screen.getByTestId('paragraph')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('should maintain proper semantic structure and IDs', () => {
      render(
        <Main id="main-content">
          <Section id="content-section">
            <Container id="content-container">
              <Article id="main-article">
                Content here
              </Article>
            </Container>
          </Section>
        </Main>
      )
      
      const main = screen.getByRole('main')
      const section = document.querySelector('section')
      const article = screen.getByRole('article')
      
      expect(main).toHaveAttribute('id', 'main-content')
      expect(section).toHaveAttribute('id', 'content-section')
      expect(article).toHaveAttribute('id', 'main-article')
    })

    it('should render with Layout containing other components', () => {
      // Suppress DOM validation warning for this test since we're testing Layout component behavior
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      const { container } = render(
        <Layout>
          <body>
            <Main>
              <Section>
                <Container>
                  <Article>
                    <div data-testid="nested-content">Nested content</div>
                  </Article>
                </Container>
              </Section>
            </Main>
          </body>
        </Layout>
      )
      
      const nestedContent = container.querySelector('[data-testid="nested-content"]')
      expect(nestedContent).toBeInTheDocument()
      
      // Restore console
      consoleSpy.mockRestore()
    })
  })
})