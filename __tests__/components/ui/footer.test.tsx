import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/ui/footer'

// Mock craft components
jest.mock('@/components/craft', () => ({
  Section: ({ children, className }: any) => (
    <section className={className} data-testid="section">
      {children}
    </section>
  ),
  Container: ({ children, className }: any) => (
    <div className={className} data-testid="container">
      {children}
    </div>
  ),
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

// Mock Button component
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, className, ...props }: any) => (
    <button className={`button-${variant} ${className}`} {...props}>
      {children}
    </button>
  ),
}))

describe('Footer Component', () => {
  it('should render footer element', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('should render main description text', () => {
    render(<Footer />)
    
    expect(screen.getByText(/kldsrf.com is a collection of my projects/)).toBeInTheDocument()
    expect(screen.getByText(/passion for robotics/)).toBeInTheDocument()
  })

  it('should render Privacy Policy link', () => {
    render(<Footer />)
    
    const privacyLink = screen.getByText('Privacy Policy')
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/')
  })

  it('should render Terms of Service link', () => {
    render(<Footer />)
    
    const termsLink = screen.getByText('Terms of Service')
    expect(termsLink).toBeInTheDocument()
    expect(termsLink.closest('a')).toHaveAttribute('href', '/')
  })

  it('should render GitHub social link', () => {
    render(<Footer />)
    
    const githubButton = screen.getByText('@khaledsharif')
    expect(githubButton).toBeInTheDocument()
    
    const githubLink = githubButton.closest('a')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/khaledsharif')
    expect(githubLink).toHaveAttribute('target', '_blank')
  })

  it('should render LinkedIn social link', () => {
    render(<Footer />)
    
    const linkedinButton = screen.getByText('@khsharif')
    expect(linkedinButton).toBeInTheDocument()
    
    const linkedinLink = linkedinButton.closest('a')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/khsharif')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
  })

  it('should render designer credit', () => {
    render(<Footer />)
    
    expect(screen.getByText('👨🏽‍💻 Designed & coded by me')).toBeInTheDocument()
  })

  it('should render Section component with correct classes', () => {
    render(<Footer />)
    
    const section = screen.getByTestId('section')
    expect(section).toHaveClass('mt-0', 'xl:mt-32')
  })

  it('should render Container components', () => {
    render(<Footer />)
    
    const containers = screen.getAllByTestId('container')
    expect(containers).toHaveLength(2)
    
    // First container
    expect(containers[0]).toHaveClass('flex', 'w-full', 'justify-between')
    
    // Second container  
    expect(containers[1]).toHaveClass('border-t', 'flex', 'flex-col', 'md:flex-row')
  })

  it('should render buttons with correct variants and classes', () => {
    render(<Footer />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    
    // GitHub button
    expect(buttons[0]).toHaveClass('button-outline')
    expect(buttons[0]).toHaveClass('flex', 'gap-1', 'justify-center', 'text-sm', 'font-light', 'hover:bg-accent', 'bg-background')
    
    // LinkedIn button
    expect(buttons[1]).toHaveClass('button-outline')
    expect(buttons[1]).toHaveClass('flex', 'gap-1', 'justify-center', 'text-sm', 'font-light', 'hover:bg-accent', 'bg-background')
  })

  it('should have proper semantic structure', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    
    const sections = screen.getAllByTestId('section')
    expect(sections).toHaveLength(1)
    
    const containers = screen.getAllByTestId('container')
    expect(containers).toHaveLength(2)
  })

  it('should render all text content correctly', () => {
    render(<Footer />)
    
    // Main description
    expect(screen.getByText(/kldsrf.com is a collection/)).toBeInTheDocument()
    
    // Navigation links
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    
    // Social media handles
    expect(screen.getByText('@khaledsharif')).toBeInTheDocument()
    expect(screen.getByText('@khsharif')).toBeInTheDocument()
    
    // Footer credit
    expect(screen.getByText('👨🏽‍💻 Designed & coded by me')).toBeInTheDocument()
  })

  it('should have correct link targets for external links', () => {
    render(<Footer />)
    
    const externalLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.startsWith('http')
    )
    
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
    })
  })

  it('should render social icons via mocked components', () => {
    render(<Footer />)
    
    // The GitHub and LinkedIn icons would be rendered as mocked components
    // We can verify the buttons contain the expected text content
    const socialButtons = screen.getAllByRole('button')
    expect(socialButtons[0]).toHaveTextContent('@khaledsharif')
    expect(socialButtons[1]).toHaveTextContent('@khsharif')
  })
})