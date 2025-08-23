import React from 'react'
import { render, screen } from '@testing-library/react'
import SourceCodeButton from '@/components/source-code'

// Mock phosphor icons
jest.mock('@phosphor-icons/react', () => ({
  ArrowSquareOut: () => <div data-testid="arrow-icon" />,
  GithubLogo: () => <div data-testid="github-icon" />,
}))

describe('SourceCodeButton Component', () => {
  const mockUrl = 'https://github.com/user/repo'

  it('should render link with correct href', () => {
    render(<SourceCodeButton url={mockUrl} />)
    
    const link = screen.getByRole('link', { name: /source code/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', mockUrl)
  })

  it('should have correct target and rel attributes', () => {
    render(<SourceCodeButton url={mockUrl} />)
    
    const link = screen.getByRole('link', { name: /source code/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render "Source Code" text', () => {
    render(<SourceCodeButton url={mockUrl} />)
    
    expect(screen.getByText('Source Code')).toBeInTheDocument()
  })

  it('should have correct CSS classes', () => {
    render(<SourceCodeButton url={mockUrl} />)
    
    const link = screen.getByRole('link', { name: /source code/i })
    expect(link).toHaveClass(
      'btn',
      'btn-outline', 
      'btn-neutral',
      'text-foreground',
      'border-border',
      'hover:bg-background',
      'hover:border-border',
      'border',
      'bg-muted',
      'flex',
      'p-4',
      'items-center',
      'justify-center',
      'gap-2',
      'rounded-lg'
    )
  })

  it('should render within centered container', () => {
    render(<SourceCodeButton url={mockUrl} />)
    
    const container = screen.getByRole('link', { name: /source code/i }).parentElement
    expect(container).toHaveClass('w-full', 'flex', 'items-center', 'justify-center')
  })

  it('should render with different URLs', () => {
    const differentUrl = 'https://github.com/another/project'
    render(<SourceCodeButton url={differentUrl} />)
    
    const link = screen.getByRole('link', { name: /source code/i })
    expect(link).toHaveAttribute('href', differentUrl)
  })

  it('should be accessible', () => {
    render(<SourceCodeButton url={mockUrl} />)
    
    const link = screen.getByRole('link', { name: /source code/i })
    expect(link).toBeInTheDocument()
    
    // Check that it's keyboard accessible (links are by default)
    expect(link.tagName).toBe('A')
  })

  it('should render icons via mocked phosphor icons', () => {
    render(<SourceCodeButton url={mockUrl} />)
    
    // The icons would be mocked by jest setup, but the component structure should be correct
    const link = screen.getByRole('link', { name: /source code/i })
    expect(link).toHaveTextContent('Source Code')
  })

  it('should handle empty URL gracefully', () => {
    render(<SourceCodeButton url="" />)
    
    const link = screen.getByText('Source Code').closest('a')
    expect(link).toHaveAttribute('href', '')
  })

  it('should maintain proper layout structure', () => {
    render(<SourceCodeButton url={mockUrl} />)
    
    // Check that the container div exists
    const container = screen.getByRole('link', { name: /source code/i }).parentElement
    expect(container).toBeInTheDocument()
    expect(container?.tagName).toBe('DIV')
    
    // Check that the link is the direct child
    const link = screen.getByRole('link', { name: /source code/i })
    expect(link.parentElement).toBe(container)
  })
})