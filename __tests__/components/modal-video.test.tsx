import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ModalVideo from '@/components/modal-video'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, ...props }: any) => (
    <img src={src} alt={alt} width={width} height={height} {...props} />
  ),
}))

// Mock @headlessui/react components
jest.mock('@headlessui/react', () => {
  const MockDialog = ({ children, onClose, initialFocus }: any) => (
    <div role="dialog" data-testid="dialog">
      <button onClick={onClose} data-testid="close-dialog">Close</button>
      {children}
    </div>
  )
  
  MockDialog.Panel = ({ children, className }: any) => (
    <div className={className} data-testid="dialog-panel">
      {children}
    </div>
  )
  
  const MockTransition = ({ children, show, afterEnter }: any) => {
    if (show && afterEnter) {
      // Simulate the transition completing and calling afterEnter
      setTimeout(() => afterEnter(), 0)
    }
    return show ? <div data-testid="transition">{children}</div> : null
  }
  
  MockTransition.Child = ({ children, ...props }: any) => (
    <div data-testid="transition-child">{children}</div>
  )
  
  return {
    Dialog: MockDialog,
    Transition: MockTransition,
    Fragment: ({ children }: any) => children,
  }
})

describe('ModalVideo Component', () => {
  const mockProps = {
    thumb: '/mock-thumb.jpg' as any,
    thumbWidth: 600,
    thumbHeight: 400,
    thumbAlt: 'Video thumbnail',
    video: '/mock-video.mp4',
    videoWidth: 800,
    videoHeight: 600,
  }

  beforeEach(() => {
    // Mock video play method
    HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve())
    HTMLMediaElement.prototype.pause = jest.fn()
  })

  it('should render thumbnail image', () => {
    render(<ModalVideo {...mockProps} />)
    
    const thumbnail = screen.getByAltText('Video thumbnail')
    expect(thumbnail).toBeInTheDocument()
    expect(thumbnail).toHaveAttribute('src', '/mock-thumb.jpg')
    expect(thumbnail).toHaveAttribute('width', '600')
    expect(thumbnail).toHaveAttribute('height', '400')
  })

  it('should render play button with correct text', () => {
    render(<ModalVideo {...mockProps} />)
    
    const playButton = screen.getByRole('button', { name: /watch astrobee map the iss/i })
    expect(playButton).toBeInTheDocument()
    expect(playButton).toHaveTextContent('Watch Astrobee map the ISS (1 min 23 sec)')
  })

  it('should open modal when play button is clicked', async () => {
    const user = userEvent.setup()
    render(<ModalVideo {...mockProps} />)
    
    const playButton = screen.getByRole('button', { name: /watch astrobee map the iss/i })
    
    await act(async () => {
      await user.click(playButton)
    })
    
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should render video element in modal', async () => {
    const user = userEvent.setup()
    render(<ModalVideo {...mockProps} />)
    
    const playButton = screen.getByRole('button', { name: /watch astrobee map the iss/i })
    
    await act(async () => {
      await user.click(playButton)
    })
    
    const video = document.querySelector('video')
    expect(video).toBeInTheDocument()
    
    if (video) {
      expect(video).toHaveAttribute('width', '800')
      expect(video).toHaveAttribute('height', '600')
      expect(video).toHaveAttribute('loop')
      expect(video).toHaveAttribute('controls')
    }
  })

  it('should render video source with correct src', async () => {
    const user = userEvent.setup()
    render(<ModalVideo {...mockProps} />)
    
    const playButton = screen.getByRole('button', { name: /watch astrobee map the iss/i })
    
    await act(async () => {
      await user.click(playButton)
    })
    
    const videoSource = document.querySelector('source')
    expect(videoSource).toBeInTheDocument()
    expect(videoSource).toHaveAttribute('src', '/mock-video.mp4')
    expect(videoSource).toHaveAttribute('type', 'video/mp4')
  })

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<ModalVideo {...mockProps} />)
    
    // Open modal
    const playButton = screen.getByRole('button', { name: /watch astrobee map the iss/i })
    await act(async () => {
      await user.click(playButton)
    })
    
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    
    // Close modal
    const closeButton = screen.getByTestId('close-dialog')
    await act(async () => {
      await user.click(closeButton)
    })
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should call video play method when modal opens', async () => {
    const user = userEvent.setup()
    const playSpy = jest.spyOn(HTMLMediaElement.prototype, 'play')
    
    render(<ModalVideo {...mockProps} />)
    
    const playButton = screen.getByRole('button', { name: /watch astrobee map the iss/i })
    
    await act(async () => {
      await user.click(playButton)
    })
    
    // Wait a bit for the afterEnter callback to be called
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    
    expect(playSpy).toHaveBeenCalled()
  })

  it('should have proper button styling', () => {
    render(<ModalVideo {...mockProps} />)
    
    const playButton = screen.getByRole('button', { name: /watch astrobee map the iss/i })
    expect(playButton).toHaveClass('btn', 'absolute', 'top-full', 'flex', 'items-center')
  })

  it('should render minimum height container', () => {
    render(<ModalVideo {...mockProps} />)
    
    const container = screen.getByAltText('Video thumbnail').closest('.min-h-\\[40vh\\]')
    expect(container).toBeInTheDocument()
  })

  it('should handle different prop values', () => {
    const customProps = {
      ...mockProps,
      thumbAlt: 'Custom alt text',
      video: '/custom-video.webm',
      thumbWidth: 800,
      thumbHeight: 600,
    }
    
    render(<ModalVideo {...customProps} />)
    
    const thumbnail = screen.getByAltText('Custom alt text')
    expect(thumbnail).toBeInTheDocument()
    expect(thumbnail).toHaveAttribute('width', '800')
    expect(thumbnail).toHaveAttribute('height', '600')
  })

  it('should render video fallback text', async () => {
    const user = userEvent.setup()
    render(<ModalVideo {...mockProps} />)
    
    const playButton = screen.getByRole('button', { name: /watch astrobee map the iss/i })
    await act(async () => {
      await user.click(playButton)
    })
    
    expect(screen.getByText('Your browser does not support the video tag.')).toBeInTheDocument()
  })

  it('should have correct modal panel styling', async () => {
    const user = userEvent.setup()
    render(<ModalVideo {...mockProps} />)
    
    const playButton = screen.getByRole('button', { name: /watch astrobee map the iss/i })
    await act(async () => {
      await user.click(playButton)
    })
    
    const panel = document.querySelector('[class*="aspect-video"]')
    expect(panel).toBeInTheDocument()
    expect(panel).toHaveClass('w-full', 'max-h-full', 'aspect-video', 'bg-background', 'overflow-hidden')
  })
})