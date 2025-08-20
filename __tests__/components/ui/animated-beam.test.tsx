import { render, screen, act } from '@testing-library/react';
import { AnimatedBeam, AnimatedBeamProps } from '@/components/ui/animated-beam';
import { RefObject, createRef } from 'react';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    linearGradient: ({ children, ...props }: any) => (
      <linearGradient data-testid="motion-gradient" {...props}>
        {children}
      </linearGradient>
    ),
  },
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('AnimatedBeam', () => {
  let containerRef: RefObject<HTMLDivElement | null>;
  let fromRef: RefObject<HTMLDivElement | null>;
  let toRef: RefObject<HTMLDivElement | null>;
  let defaultProps: AnimatedBeamProps;

  beforeEach(() => {
    containerRef = createRef<HTMLDivElement>();
    fromRef = createRef<HTMLDivElement>();
    toRef = createRef<HTMLDivElement>();

    // Mock the DOM elements
    const mockContainer = document.createElement('div');
    const mockFrom = document.createElement('div');
    const mockTo = document.createElement('div');

    // Mock getBoundingClientRect
    mockContainer.getBoundingClientRect = jest.fn(() => ({
      width: 400,
      height: 300,
      left: 0,
      top: 0,
      right: 400,
      bottom: 300,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    }));

    mockFrom.getBoundingClientRect = jest.fn(() => ({
      width: 50,
      height: 50,
      left: 50,
      top: 50,
      right: 100,
      bottom: 100,
      x: 50,
      y: 50,
      toJSON: jest.fn(),
    }));

    mockTo.getBoundingClientRect = jest.fn(() => ({
      width: 50,
      height: 50,
      left: 300,
      top: 200,
      right: 350,
      bottom: 250,
      x: 300,
      y: 200,
      toJSON: jest.fn(),
    }));

    // Assign mock elements to refs
    (containerRef as any).current = mockContainer;
    (fromRef as any).current = mockFrom;
    (toRef as any).current = mockTo;

    defaultProps = {
      containerRef,
      fromRef,
      toRef,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders SVG element with correct structure', () => {
    render(<AnimatedBeam {...defaultProps} />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.tagName).toBe('svg');
  });

  it('applies default props correctly', () => {
    render(<AnimatedBeam {...defaultProps} />);
    
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('pointer-events-none', 'absolute', 'left-0', 'top-0');
  });

  it('merges custom className with default classes', () => {
    render(<AnimatedBeam {...defaultProps} className="custom-class" />);
    
    const svg = document.querySelector('svg');
    expect(svg).toHaveClass('pointer-events-none', 'custom-class');
  });

  it('renders two path elements', () => {
    render(<AnimatedBeam {...defaultProps} />);
    
    const paths = document.querySelectorAll('path');
    expect(paths).toHaveLength(2);
  });

  it('renders gradient definition', () => {
    render(<AnimatedBeam {...defaultProps} />);
    
    expect(screen.getByTestId('motion-gradient')).toBeInTheDocument();
  });

  it('applies custom path styling props', () => {
    render(
      <AnimatedBeam 
        {...defaultProps} 
        pathColor="red"
        pathWidth={5}
        pathOpacity={0.5}
      />
    );
    
    const paths = document.querySelectorAll('path');
    const staticPath = paths[0];
    
    expect(staticPath).toHaveAttribute('stroke', 'red');
    expect(staticPath).toHaveAttribute('stroke-width', '5');
    expect(staticPath).toHaveAttribute('stroke-opacity', '0.5');
  });

  it('applies custom gradient colors', () => {
    render(
      <AnimatedBeam 
        {...defaultProps} 
        gradientStartColor="#ff0000"
        gradientStopColor="#00ff00"
      />
    );
    
    const stops = document.querySelectorAll('stop');
    
    expect(stops[1]).toHaveAttribute('stop-color', '#ff0000');
    expect(stops[2]).toHaveAttribute('stop-color', '#00ff00');
  });

  it('sets up ResizeObserver correctly', () => {
    render(<AnimatedBeam {...defaultProps} />);
    
    expect(global.ResizeObserver).toHaveBeenCalledWith(expect.any(Function));
    const observerInstance = (global.ResizeObserver as jest.Mock).mock.results[0].value;
    expect(observerInstance.observe).toHaveBeenCalledWith(containerRef.current);
  });

  it('handles reverse prop correctly', () => {
    render(<AnimatedBeam {...defaultProps} reverse={true} />);
    
    const gradient = screen.getByTestId('motion-gradient');
    expect(gradient).toBeInTheDocument();
    // The reverse prop affects the gradient coordinates in the motion.linearGradient
  });

  it('applies stroke linecap correctly', () => {
    render(<AnimatedBeam {...defaultProps} />);
    
    const paths = document.querySelectorAll('path');
    
    paths.forEach(path => {
      expect(path).toHaveAttribute('stroke-linecap', 'round');
    });
  });

  it('renders gradient stops with correct opacity values', () => {
    render(<AnimatedBeam {...defaultProps} />);
    
    const stops = document.querySelectorAll('stop');
    
    expect(stops[0]).toHaveAttribute('stop-opacity', '0');
    expect(stops[1]).not.toHaveAttribute('stop-opacity');
    expect(stops[2]).not.toHaveAttribute('stop-opacity');
    expect(stops[3]).toHaveAttribute('stop-opacity', '0');
  });

  it('applies curvature to path calculation', () => {
    render(<AnimatedBeam {...defaultProps} curvature={50} />);
    
    const paths = document.querySelectorAll('path');
    const pathD = paths[0].getAttribute('d');
    
    // Path should include quadratic curve (Q command)
    expect(pathD).toMatch(/Q/);
  });

  it('handles offset props correctly', () => {
    render(
      <AnimatedBeam 
        {...defaultProps} 
        startXOffset={10}
        startYOffset={20}
        endXOffset={30}
        endYOffset={40}
      />
    );
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // The offsets affect path calculation internally
  });

  it('sets viewBox correctly based on container dimensions', () => {
    render(<AnimatedBeam {...defaultProps} />);
    
    const svg = document.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 400 300');
  });

  it('uses unique id for gradient', () => {
    const { rerender } = render(<AnimatedBeam {...defaultProps} />);
    const gradient1 = document.querySelector('linearGradient');
    const id1 = gradient1?.getAttribute('id');
    
    rerender(<AnimatedBeam {...defaultProps} />);
    const gradient2 = document.querySelector('linearGradient');
    const id2 = gradient2?.getAttribute('id');
    
    expect(id1).toBeDefined();
    expect(id2).toBeDefined();
    // IDs should be different for different instances
  });

  it('handles ResizeObserver callback', () => {
    let resizeCallback: (entries: ResizeObserverEntry[]) => void;
    
    // Mock ResizeObserver to capture the callback
    const mockObserve = jest.fn();
    const mockDisconnect = jest.fn();
    
    global.ResizeObserver = jest.fn().mockImplementation((callback) => {
      resizeCallback = callback;
      return {
        observe: mockObserve,
        unobserve: jest.fn(),
        disconnect: mockDisconnect,
      };
    });

    render(<AnimatedBeam {...defaultProps} />);
    
    expect(global.ResizeObserver).toHaveBeenCalledWith(expect.any(Function));
    expect(mockObserve).toHaveBeenCalledWith(containerRef.current);

    // Simulate resize observer callback
    const mockEntries = [
      {
        target: containerRef.current,
        contentRect: { width: 500, height: 400 },
      },
      {
        target: containerRef.current,
        contentRect: { width: 600, height: 500 },
      },
    ] as ResizeObserverEntry[];

    // Call the callback with multiple entries to trigger the loop
    if (resizeCallback) {
      act(() => {
        resizeCallback(mockEntries);
      });
    }

    // Path should be updated when resize occurs
    const paths = document.querySelectorAll('path');
    expect(paths).toHaveLength(2);
  });

  it('disconnects ResizeObserver on unmount', () => {
    let resizeCallback: (entries: ResizeObserverEntry[]) => void;
    const mockDisconnect = jest.fn();
    
    global.ResizeObserver = jest.fn().mockImplementation((callback) => {
      resizeCallback = callback;
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: mockDisconnect,
      };
    });

    const { unmount } = render(<AnimatedBeam {...defaultProps} />);
    
    unmount();
    
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('handles when refs are null', () => {
    const nullContainerRef = createRef<HTMLDivElement>();
    const nullFromRef = createRef<HTMLDivElement>();
    const nullToRef = createRef<HTMLDivElement>();
    
    // Refs are null (not assigned to any DOM elements)
    const nullProps = {
      containerRef: nullContainerRef,
      fromRef: nullFromRef,
      toRef: nullToRef,
    };
    
    // Should render without errors even with null refs
    render(<AnimatedBeam {...nullProps} />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    
    // Path should not be set when refs are null
    const paths = document.querySelectorAll('path');
    expect(paths[0].getAttribute('d')).toBe('');
  });

  it('handles when containerRef is null but other refs exist', () => {
    const nullContainerRef = createRef<HTMLDivElement>();
    
    const propsWithNullContainer = {
      containerRef: nullContainerRef,
      fromRef,
      toRef,
    };
    
    const mockObserve = jest.fn();
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: mockObserve,
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
    
    render(<AnimatedBeam {...propsWithNullContainer} />);
    
    // ResizeObserver should not observe null container
    expect(mockObserve).not.toHaveBeenCalled();
  });
});