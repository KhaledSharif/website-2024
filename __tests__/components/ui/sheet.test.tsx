import { render, screen } from '@testing-library/react';
import {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

// Mock @radix-ui/react-dialog
jest.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children, ...props }: any) => <div data-testid="sheet-root" {...props}>{children}</div>,
  Portal: ({ children }: any) => <div data-testid="sheet-portal">{children}</div>,
  Overlay: ({ children, className, ...props }: any) => (
    <div data-testid="sheet-overlay" className={className} {...props}>{children}</div>
  ),
  Trigger: ({ children, ...props }: any) => (
    <button data-testid="sheet-trigger" {...props}>{children}</button>
  ),
  Close: ({ children, className, ...props }: any) => (
    <button data-testid="sheet-close" className={className} {...props}>{children}</button>
  ),
  Content: ({ children, className, ...props }: any) => (
    <div data-testid="sheet-content" className={className} {...props}>{children}</div>
  ),
  Title: ({ children, className, ...props }: any) => (
    <h2 data-testid="sheet-title" className={className} {...props}>{children}</h2>
  ),
  Description: ({ children, className, ...props }: any) => (
    <p data-testid="sheet-description" className={className} {...props}>{children}</p>
  ),
}));

// Mock lucide-react
jest.mock('lucide-react', () => ({
  X: () => <div data-testid="close-icon" />,
}));

describe('Sheet Components', () => {
  describe('Sheet', () => {
    it('renders correctly', () => {
      render(
        <Sheet>
          <div>Sheet content</div>
        </Sheet>
      );
      
      expect(screen.getByTestId('sheet-root')).toBeInTheDocument();
      expect(screen.getByText('Sheet content')).toBeInTheDocument();
    });
  });

  describe('SheetPortal', () => {
    it('renders portal correctly', () => {
      render(
        <SheetPortal>
          <div>Portal content</div>
        </SheetPortal>
      );
      
      expect(screen.getByTestId('sheet-portal')).toBeInTheDocument();
      expect(screen.getByText('Portal content')).toBeInTheDocument();
    });
  });

  describe('SheetOverlay', () => {
    it('renders with default classes', () => {
      render(<SheetOverlay />);
      
      const overlay = screen.getByTestId('sheet-overlay');
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveClass(
        'fixed', 'inset-0', 'z-50', 'bg-background/80',
        'data-[state=open]:animate-in', 'data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0', 'data-[state=open]:fade-in-0'
      );
    });

    it('merges custom className with default classes', () => {
      render(<SheetOverlay className="custom-overlay" />);
      
      const overlay = screen.getByTestId('sheet-overlay');
      expect(overlay).toHaveClass('custom-overlay');
      expect(overlay).toHaveClass('fixed', 'inset-0', 'z-50');
    });

    it('forwards props correctly', () => {
      render(<SheetOverlay data-custom="test" />);
      
      const overlay = screen.getByTestId('sheet-overlay');
      expect(overlay).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('SheetTrigger', () => {
    it('renders correctly', () => {
      render(
        <SheetTrigger>
          <span>Open Sheet</span>
        </SheetTrigger>
      );
      
      const trigger = screen.getByTestId('sheet-trigger');
      expect(trigger).toBeInTheDocument();
      expect(screen.getByText('Open Sheet')).toBeInTheDocument();
    });
  });

  describe('SheetClose', () => {
    it('renders correctly', () => {
      render(
        <SheetClose>
          <span>Close Sheet</span>
        </SheetClose>
      );
      
      const close = screen.getByTestId('sheet-close');
      expect(close).toBeInTheDocument();
      expect(screen.getByText('Close Sheet')).toBeInTheDocument();
    });
  });

  describe('SheetContent', () => {
    it('renders with default side (right)', () => {
      render(
        <SheetContent>
          <div>Content</div>
        </SheetContent>
      );
      
      const content = screen.getByTestId('sheet-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass(
        'fixed', 'z-50', 'gap-4', 'bg-background', 'p-6', 'shadow-lg',
        'transition', 'ease-in-out', 'inset-y-0', 'right-0', 'h-full',
        'w-3/4', 'border-l', 'sm:max-w-sm'
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with top side variant', () => {
      render(
        <SheetContent side="top">
          <div>Top content</div>
        </SheetContent>
      );
      
      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass(
        'inset-x-0', 'top-0', 'border-b',
        'data-[state=closed]:slide-out-to-top',
        'data-[state=open]:slide-in-from-top'
      );
    });

    it('renders with bottom side variant', () => {
      render(
        <SheetContent side="bottom">
          <div>Bottom content</div>
        </SheetContent>
      );
      
      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass(
        'inset-x-0', 'bottom-0', 'border-t',
        'data-[state=closed]:slide-out-to-bottom',
        'data-[state=open]:slide-in-from-bottom'
      );
    });

    it('renders with left side variant', () => {
      render(
        <SheetContent side="left">
          <div>Left content</div>
        </SheetContent>
      );
      
      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass(
        'inset-y-0', 'left-0', 'h-full', 'w-3/4', 'border-r',
        'data-[state=closed]:slide-out-to-left',
        'data-[state=open]:slide-in-from-left', 'sm:max-w-sm'
      );
    });

    it('renders with custom className', () => {
      render(
        <SheetContent className="custom-content">
          <div>Content</div>
        </SheetContent>
      );
      
      const content = screen.getByTestId('sheet-content');
      expect(content).toHaveClass('custom-content');
    });

    it('renders close button with icon', () => {
      render(
        <SheetContent>
          <div>Content</div>
        </SheetContent>
      );
      
      const closeButton = screen.getByTestId('sheet-close');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveClass(
        'absolute', 'right-4', 'top-4', 'rounded-sm', 'opacity-70',
        'ring-offset-background', 'transition-opacity', 'hover:opacity-100',
        'focus:outline-none', 'focus:ring-2', 'focus:ring-ring',
        'focus:ring-offset-2', 'disabled:pointer-events-none',
        'data-[state=open]:bg-secondary'
      );
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('includes overlay in portal', () => {
      render(
        <SheetContent>
          <div>Content</div>
        </SheetContent>
      );
      
      expect(screen.getByTestId('sheet-portal')).toBeInTheDocument();
      expect(screen.getByTestId('sheet-overlay')).toBeInTheDocument();
    });
  });

  describe('SheetHeader', () => {
    it('renders with default classes', () => {
      render(
        <SheetHeader>
          <div data-testid="header-content">Header content</div>
        </SheetHeader>
      );
      
      const header = screen.getByTestId('header-content').parentElement;
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass(
        'flex', 'flex-col', 'space-y-2', 'text-center', 'sm:text-left'
      );
      expect(screen.getByTestId('header-content')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <SheetHeader className="custom-header">
          <div data-testid="header-content">Header content</div>
        </SheetHeader>
      );
      
      const header = screen.getByTestId('header-content').parentElement;
      expect(header).toHaveClass('custom-header');
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-2');
    });

    it('forwards props correctly', () => {
      render(
        <SheetHeader data-custom="test">
          <div data-testid="header-content">Header content</div>
        </SheetHeader>
      );
      
      const header = screen.getByTestId('header-content').parentElement;
      expect(header).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('SheetFooter', () => {
    it('renders with default classes', () => {
      render(
        <SheetFooter>
          <div data-testid="footer-content">Footer content</div>
        </SheetFooter>
      );
      
      const footer = screen.getByTestId('footer-content').parentElement;
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass(
        'flex', 'flex-col-reverse', 'sm:flex-row',
        'sm:justify-end', 'sm:space-x-2'
      );
      expect(screen.getByTestId('footer-content')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <SheetFooter className="custom-footer">
          <div data-testid="footer-content">Footer content</div>
        </SheetFooter>
      );
      
      const footer = screen.getByTestId('footer-content').parentElement;
      expect(footer).toHaveClass('custom-footer');
      expect(footer).toHaveClass('flex', 'flex-col-reverse');
    });

    it('forwards props correctly', () => {
      render(
        <SheetFooter data-custom="test">
          <div data-testid="footer-content">Footer content</div>
        </SheetFooter>
      );
      
      const footer = screen.getByTestId('footer-content').parentElement;
      expect(footer).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('SheetTitle', () => {
    it('renders with default classes', () => {
      render(<SheetTitle>Sheet Title</SheetTitle>);
      
      const title = screen.getByTestId('sheet-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-lg', 'font-semibold', 'text-foreground');
      expect(title).toHaveTextContent('Sheet Title');
    });

    it('merges custom className with default classes', () => {
      render(<SheetTitle className="custom-title">Sheet Title</SheetTitle>);
      
      const title = screen.getByTestId('sheet-title');
      expect(title).toHaveClass('custom-title');
      expect(title).toHaveClass('text-lg', 'font-semibold');
    });

    it('forwards props correctly', () => {
      render(<SheetTitle data-custom="test">Sheet Title</SheetTitle>);
      
      const title = screen.getByTestId('sheet-title');
      expect(title).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('SheetDescription', () => {
    it('renders with default classes', () => {
      render(<SheetDescription>Sheet description text</SheetDescription>);
      
      const description = screen.getByTestId('sheet-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
      expect(description).toHaveTextContent('Sheet description text');
    });

    it('merges custom className with default classes', () => {
      render(
        <SheetDescription className="custom-description">
          Sheet description text
        </SheetDescription>
      );
      
      const description = screen.getByTestId('sheet-description');
      expect(description).toHaveClass('custom-description');
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
    });

    it('forwards props correctly', () => {
      render(
        <SheetDescription data-custom="test">
          Sheet description text
        </SheetDescription>
      );
      
      const description = screen.getByTestId('sheet-description');
      expect(description).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('Integration', () => {
    it('renders complete sheet structure', () => {
      render(
        <Sheet>
          <SheetTrigger>
            Open Sheet
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>Sheet Description</SheetDescription>
            </SheetHeader>
            <div>Main content</div>
            <SheetFooter>
              <SheetClose>Close</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
      
      expect(screen.getByTestId('sheet-root')).toBeInTheDocument();
      expect(screen.getByTestId('sheet-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('sheet-content')).toBeInTheDocument();
      expect(screen.getByTestId('sheet-title')).toBeInTheDocument();
      expect(screen.getByTestId('sheet-description')).toBeInTheDocument();
      expect(screen.getAllByTestId('sheet-close')).toHaveLength(2); // One in footer, one auto-generated
      expect(screen.getByTestId('sheet-portal')).toBeInTheDocument();
      expect(screen.getByTestId('sheet-overlay')).toBeInTheDocument();
      
      expect(screen.getByText('Open Sheet')).toBeInTheDocument();
      expect(screen.getByText('Sheet Title')).toBeInTheDocument();
      expect(screen.getByText('Sheet Description')).toBeInTheDocument();
      expect(screen.getByText('Main content')).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });
});