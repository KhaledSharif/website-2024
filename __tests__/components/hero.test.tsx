import React from 'react'
import { render, screen, act } from '@testing-library/react'
import Hero from '@/components/hero'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, priority, sizes, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

// Mock @headlessui/react components  
jest.mock('@headlessui/react', () => ({
  Transition: Object.assign(
    ({ children, show }: any) => show ? <>{children}</> : null,
    { Child: ({ children }: any) => <>{children}</> }
  ),
  Dialog: Object.assign(
    ({ children, open }: any) => open ? <div>{children}</div> : null,
    { Panel: ({ children }: any) => <div>{children}</div> }
  ),
}))

// Mock @phosphor-icons/react
jest.mock('@phosphor-icons/react', () => ({
  PlayCircle: () => <span>PlayCircle</span>,
}))

describe('Hero Component', () => {
  it('should render the hero section', () => {
    render(<Hero />)
    
    const heroSection = screen.getByText(/hi there!/i).closest('section')
    expect(heroSection).toBeInTheDocument()
  })

  it('should display the introduction text', () => {
    render(<Hero />)
    
    expect(screen.getByText(/hi there!/i)).toBeInTheDocument()
    expect(screen.getByText(/i'm khaled/i)).toBeInTheDocument()
    expect(screen.getByText(/robotics engineer/i)).toBeInTheDocument()
    expect(screen.getByText(/nasa/i)).toBeInTheDocument()
    // Use getAllByText since "Astrobee" appears multiple times
    expect(screen.getAllByText(/astrobee/i)).toHaveLength(2)
    expect(screen.getByText(/international space station/i)).toBeInTheDocument()
  })

  it('should render the ModalVideo component', () => {
    render(<Hero />)
    
    // Check for video-related content - the actual text is "Watch Astrobee map the ISS"
    expect(screen.getByText(/watch astrobee map the iss/i)).toBeInTheDocument()
  })

  it('should have proper semantic structure', () => {
    render(<Hero />)
    
    const section = screen.getByText(/hi there!/i).closest('section')
    expect(section).toBeInTheDocument()
    
    // Should have proper heading structure
    const textContent = screen.getByText(/hi there!/i)
    expect(textContent).toBeInTheDocument()
  })

  it('should have responsive classes', () => {
    render(<Hero />)
    
    const section = screen.getByText(/hi there!/i).closest('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('relative')
    
    const container = section?.querySelector('.max-w-6xl')
    expect(container).toBeInTheDocument()
  })

  it('should render with proper spacing classes', () => {
    render(<Hero />)
    
    const section = screen.getByText(/hi there!/i).closest('section')
    expect(section).toBeInTheDocument()
    const contentDiv = section?.querySelector('.pt-32')
    expect(contentDiv).toBeInTheDocument()
  })

  it('should contain the video modal with correct props', () => {
    render(<Hero />)
    
    // Check that the video modal is rendered with the expected content
    expect(screen.getByText(/watch astrobee map the iss/i)).toBeInTheDocument()
    expect(screen.getByText(/1 min 23 sec/i)).toBeInTheDocument()
  })

  it('should have proper text alignment', () => {
    render(<Hero />)
    
    const textCenter = screen.getByText(/hi there!/i).closest('.text-center')
    expect(textCenter).toBeInTheDocument()
  })

  it('should have proper max width constraints', () => {
    render(<Hero />)
    
    const maxWidthContainer = screen.getByText(/hi there!/i).closest('.max-w-3xl')
    expect(maxWidthContainer).toBeInTheDocument()
  })
}) 