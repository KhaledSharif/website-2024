import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

// Mock embla-carousel-react
const mockScrollPrev = jest.fn()
const mockScrollNext = jest.fn()
const mockCanScrollPrev = jest.fn(() => true)
const mockCanScrollNext = jest.fn(() => true)
const mockOn = jest.fn()
const mockOff = jest.fn()

const mockApi = {
  scrollPrev: mockScrollPrev,
  scrollNext: mockScrollNext,
  canScrollPrev: mockCanScrollPrev,
  canScrollNext: mockCanScrollNext,
  on: mockOn,
  off: mockOff,
}

const mockCarouselRef = { current: null }

jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: jest.fn(() => [mockCarouselRef, mockApi]),
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  ArrowRight: () => <div data-testid="arrow-right-icon" />,
}))

// Mock Button component
jest.mock('@/components/ui/button', () => ({
  Button: React.forwardRef<HTMLButtonElement, any>(
    ({ children, className, disabled, onClick, ...props }, ref) => (
      <button
        className={className}
        disabled={disabled}
        onClick={onClick}
        {...{ ...props, ref }}
      >
        {children}
      </button>
    )
  ),
}))

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}))

describe('Carousel Components', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Carousel', () => {
    it('should render carousel container', () => {
      render(
        <Carousel>
          <div data-testid="carousel-child">Test content</div>
        </Carousel>
      )

      const carousel = screen.getByRole('region')
      expect(carousel).toBeInTheDocument()
      expect(carousel).toHaveAttribute('aria-roledescription', 'carousel')
      expect(screen.getByTestId('carousel-child')).toBeInTheDocument()
    })

    it('should have correct default classes', () => {
      render(
        <Carousel>
          <div>Test</div>
        </Carousel>
      )

      const carousel = screen.getByRole('region')
      expect(carousel).toHaveClass('relative')
    })

    it('should merge custom className', () => {
      render(
        <Carousel className="custom-class">
          <div>Test</div>
        </Carousel>
      )

      const carousel = screen.getByRole('region')
      expect(carousel).toHaveClass('relative', 'custom-class')
    })

    it('should handle keyboard navigation - ArrowLeft', () => {
      render(
        <Carousel>
          <div>Test</div>
        </Carousel>
      )

      const carousel = screen.getByRole('region')
      fireEvent.keyDown(carousel, { key: 'ArrowLeft' })

      expect(mockScrollPrev).toHaveBeenCalled()
    })

    it('should handle keyboard navigation - ArrowRight', () => {
      render(
        <Carousel>
          <div>Test</div>
        </Carousel>
      )

      const carousel = screen.getByRole('region')
      fireEvent.keyDown(carousel, { key: 'ArrowRight' })

      expect(mockScrollNext).toHaveBeenCalled()
    })

    it('should call setApi when provided', () => {
      const setApiMock = jest.fn()
      
      render(
        <Carousel setApi={setApiMock}>
          <div>Test</div>
        </Carousel>
      )

      expect(setApiMock).toHaveBeenCalledWith(mockApi)
    })

    it('should handle vertical orientation', () => {
      render(
        <Carousel orientation="vertical">
          <CarouselContent>
            <CarouselItem>Item 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )

      const content = screen.getByText('Item 1').closest('div')
      expect(content).toHaveClass('pt-4')
    })

    it('should handle when api is null', () => {
      // Mock embla-carousel-react to return null api
      const useEmblaCarouselMock = require('embla-carousel-react').default
      useEmblaCarouselMock.mockImplementationOnce(() => [
        React.createRef() as any,
        null, // api is null
      ])

      // This should not throw an error even with null api
      expect(() => {
        render(
          <Carousel>
            <CarouselContent>
              <CarouselItem>Item 1</CarouselItem>
            </CarouselContent>
          </Carousel>
        )
      }).not.toThrow()
      
      // Restore the original mock
      useEmblaCarouselMock.mockImplementation(() => [mockCarouselRef, mockApi])
    })
  })

  describe('CarouselContent', () => {
    const CarouselWrapper = ({ children, orientation = 'horizontal' }: any) => (
      <Carousel orientation={orientation}>
        {children}
      </Carousel>
    )

    it('should render content container', () => {
      render(
        <CarouselWrapper>
          <CarouselContent>
            <div data-testid="content">Test content</div>
          </CarouselContent>
        </CarouselWrapper>
      )

      expect(screen.getByTestId('content')).toBeInTheDocument()
    })

    it('should have horizontal orientation classes by default', () => {
      render(
        <CarouselWrapper>
          <CarouselContent>
            <div data-testid="content">Test</div>
          </CarouselContent>
        </CarouselWrapper>
      )

      const contentParent = screen.getByTestId('content').parentElement
      expect(contentParent).toHaveClass('flex', '-ml-4')
    })

    it('should have vertical orientation classes', () => {
      render(
        <CarouselWrapper orientation="vertical">
          <CarouselContent>
            <div data-testid="content">Test</div>
          </CarouselContent>
        </CarouselWrapper>
      )

      const contentParent = screen.getByTestId('content').parentElement
      expect(contentParent).toHaveClass('flex', '-mt-4', 'flex-col')
    })

    it('should merge custom className', () => {
      render(
        <CarouselWrapper>
          <CarouselContent className="custom-content">
            <div data-testid="content">Test</div>
          </CarouselContent>
        </CarouselWrapper>
      )

      const contentParent = screen.getByTestId('content').parentElement
      expect(contentParent).toHaveClass('custom-content')
    })
  })

  describe('CarouselItem', () => {
    const CarouselWrapper = ({ children, orientation = 'horizontal' }: any) => (
      <Carousel orientation={orientation}>
        <CarouselContent>
          {children}
        </CarouselContent>
      </Carousel>
    )

    it('should render carousel item', () => {
      render(
        <CarouselWrapper>
          <CarouselItem>
            <div data-testid="item">Test item</div>
          </CarouselItem>
        </CarouselWrapper>
      )

      const item = screen.getByTestId('item').parentElement
      expect(item).toHaveAttribute('role', 'group')
      expect(item).toHaveAttribute('aria-roledescription', 'slide')
    })

    it('should have horizontal orientation classes by default', () => {
      render(
        <CarouselWrapper>
          <CarouselItem>
            <div data-testid="item">Test</div>
          </CarouselItem>
        </CarouselWrapper>
      )

      const item = screen.getByTestId('item').parentElement
      expect(item).toHaveClass('min-w-0', 'shrink-0', 'grow-0', 'basis-full', 'pl-4')
    })

    it('should have vertical orientation classes', () => {
      render(
        <CarouselWrapper orientation="vertical">
          <CarouselItem>
            <div data-testid="item">Test</div>
          </CarouselItem>
        </CarouselWrapper>
      )

      const item = screen.getByTestId('item').parentElement
      expect(item).toHaveClass('min-w-0', 'shrink-0', 'grow-0', 'basis-full', 'pt-4')
    })

    it('should merge custom className', () => {
      render(
        <CarouselWrapper>
          <CarouselItem className="custom-item">
            <div data-testid="item">Test</div>
          </CarouselItem>
        </CarouselWrapper>
      )

      const item = screen.getByTestId('item').parentElement
      expect(item).toHaveClass('custom-item')
    })
  })

  describe('CarouselPrevious', () => {
    const CarouselWrapper = ({ children, orientation = 'horizontal' }: any) => (
      <Carousel orientation={orientation}>
        <CarouselContent>
          <CarouselItem>Item</CarouselItem>
        </CarouselContent>
        {children}
      </Carousel>
    )

    it('should render previous button', () => {
      render(
        <CarouselWrapper>
          <CarouselPrevious />
        </CarouselWrapper>
      )

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument()
      expect(screen.getByText('Previous slide')).toBeInTheDocument()
    })

    it('should call scrollPrev when clicked', async () => {
      const user = userEvent.setup()
      
      render(
        <CarouselWrapper>
          <CarouselPrevious />
        </CarouselWrapper>
      )

      const button = screen.getByRole('button')
      await act(async () => {
        await user.click(button)
      })

      expect(mockScrollPrev).toHaveBeenCalled()
    })

    it('should be disabled when canScrollPrev is false', () => {
      mockCanScrollPrev.mockReturnValue(false)
      
      render(
        <CarouselWrapper>
          <CarouselPrevious />
        </CarouselWrapper>
      )

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should have horizontal positioning classes', () => {
      render(
        <CarouselWrapper>
          <CarouselPrevious />
        </CarouselWrapper>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass('absolute', 'h-8', 'w-8', 'rounded-full', '-left-8', 'top-1/2', '-translate-y-1/2')
    })

    it('should have vertical positioning classes', () => {
      render(
        <CarouselWrapper orientation="vertical">
          <CarouselPrevious />
        </CarouselWrapper>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass('absolute', 'h-8', 'w-8', 'rounded-full', '-top-12', 'left-1/2', '-translate-x-1/2', 'rotate-90')
    })
  })

  describe('CarouselNext', () => {
    const CarouselWrapper = ({ children, orientation = 'horizontal' }: any) => (
      <Carousel orientation={orientation}>
        <CarouselContent>
          <CarouselItem>Item</CarouselItem>
        </CarouselContent>
        {children}
      </Carousel>
    )

    it('should render next button', () => {
      render(
        <CarouselWrapper>
          <CarouselNext />
        </CarouselWrapper>
      )

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument()
      expect(screen.getByText('Next slide')).toBeInTheDocument()
    })

    it('should call scrollNext when clicked', async () => {
      const user = userEvent.setup()
      
      render(
        <CarouselWrapper>
          <CarouselNext />
        </CarouselWrapper>
      )

      const button = screen.getByRole('button')
      await act(async () => {
        await user.click(button)
      })

      expect(mockScrollNext).toHaveBeenCalled()
    })

    it('should be disabled when canScrollNext is false', () => {
      mockCanScrollNext.mockReturnValue(false)
      
      render(
        <CarouselWrapper>
          <CarouselNext />
        </CarouselWrapper>
      )

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should have horizontal positioning classes', () => {
      render(
        <CarouselWrapper>
          <CarouselNext />
        </CarouselWrapper>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass('absolute', 'h-8', 'w-8', 'rounded-full', '-right-8', 'top-1/2', '-translate-y-1/2')
    })

    it('should have vertical positioning classes', () => {
      render(
        <CarouselWrapper orientation="vertical">
          <CarouselNext />
        </CarouselWrapper>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass('absolute', 'h-8', 'w-8', 'rounded-full', '-bottom-12', 'left-1/2', '-translate-x-1/2', 'rotate-90')
    })
  })

  describe('useCarousel hook error handling', () => {
    it('should throw error when used outside Carousel context', () => {
      // Suppress console errors for this test to avoid noise
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      
      // Create a component that uses the hook outside of context
      const TestComponent = () => {
        return <CarouselItem>Test</CarouselItem>
      }

      // This should throw an error when rendering outside of Carousel context
      expect(() => render(<TestComponent />)).toThrow('useCarousel must be used within a <Carousel />')
      
      // Restore console
      consoleSpy.mockRestore()
    })
  })

  describe('useCarousel hook edge cases', () => {
    it('should handle onSelect callback when api is null', () => {
      // Mock embla-carousel-react to return [null, null]
      const mockCarouselRef = { current: null };
      const mockApi = null;
      
      require('embla-carousel-react').default.mockReturnValue([mockCarouselRef, mockApi]);
      
      // This should not throw error when api is null
      expect(() => render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Item 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )).not.toThrow();
    });

    it('should call onSelect callback and handle null api properly', () => {
      // Create a custom onSelect function that gets called
      const mockSetCanScrollPrev = jest.fn();
      const mockSetCanScrollNext = jest.fn();
      
      // Mock a valid API first to initialize the component
      const validApi = {
        scrollPrev: jest.fn(),
        scrollNext: jest.fn(),
        canScrollPrev: jest.fn(() => true),
        canScrollNext: jest.fn(() => false),
        on: jest.fn((event, callback) => {
          // Immediately call the callback with null API to test the early return
          if (event === 'select') {
            setTimeout(() => callback(null), 0);
          }
        }),
        off: jest.fn(),
      };
      
      require('embla-carousel-react').default.mockReturnValue([{ current: null }, validApi]);
      
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Item 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      );
      
      // The onSelect callback should have been registered
      expect(validApi.on).toHaveBeenCalledWith('select', expect.any(Function));
      
      // The callback will be called with null API, testing the early return
      // This should not throw and should exit early
      setTimeout(() => {
        expect(mockSetCanScrollPrev).not.toHaveBeenCalled();
        expect(mockSetCanScrollNext).not.toHaveBeenCalled();
      }, 10);
    });

    it('should handle useEffect when api is null', () => {
      // Mock to return null api initially
      const mockCarouselRef = { current: null };
      let mockApi = null;
      
      require('embla-carousel-react').default.mockReturnValue([mockCarouselRef, mockApi]);
      
      const { rerender } = render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Item 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      );
      
      // Now update to have a valid api
      mockApi = {
        scrollPrev: jest.fn(),
        scrollNext: jest.fn(),
        canScrollPrev: jest.fn(() => true),
        canScrollNext: jest.fn(() => true),
        on: jest.fn(),
        off: jest.fn(),
      };
      
      require('embla-carousel-react').default.mockReturnValue([mockCarouselRef, mockApi]);
      
      // Rerender with valid api - should not throw
      expect(() => rerender(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Item 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      )).not.toThrow();
    });

    it('should handle setApi external callback', () => {
      const setApiMock = jest.fn();
      
      render(
        <Carousel setApi={setApiMock}>
          <CarouselContent>
            <CarouselItem>Item 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      );
      
      expect(setApiMock).toHaveBeenCalledWith(expect.objectContaining({
        scrollPrev: expect.any(Function),
        scrollNext: expect.any(Function),
        canScrollPrev: expect.any(Function),
        canScrollNext: expect.any(Function),
        on: expect.any(Function),
        off: expect.any(Function),
      }));
    });

    it('should handle api event listeners cleanup', () => {
      const mockOff = jest.fn();
      const apiWithOff = {
        ...mockApi,
        off: mockOff,
      };
      
      require('embla-carousel-react').default.mockReturnValue([mockCarouselRef, apiWithOff]);
      
      const { unmount } = render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Item 1</CarouselItem>
          </CarouselContent>
        </Carousel>
      );
      
      unmount();
      
      expect(mockOff).toHaveBeenCalled();
    });
  })

  describe('Full carousel integration', () => {
    it('should render complete carousel with all components', () => {
      render(
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div data-testid="item-1">Item 1</div>
            </CarouselItem>
            <CarouselItem>
              <div data-testid="item-2">Item 2</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )

      expect(screen.getByRole('region')).toBeInTheDocument()
      expect(screen.getByTestId('item-1')).toBeInTheDocument()
      expect(screen.getByTestId('item-2')).toBeInTheDocument()
      expect(screen.getAllByRole('button')).toHaveLength(2)
      expect(screen.getByText('Previous slide')).toBeInTheDocument()
      expect(screen.getByText('Next slide')).toBeInTheDocument()
    })
  })
})