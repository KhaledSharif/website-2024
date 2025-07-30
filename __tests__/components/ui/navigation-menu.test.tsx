import { render, screen } from '@testing-library/react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

// Mock @radix-ui/react-navigation-menu
jest.mock('@radix-ui/react-navigation-menu', () => ({
  Root: ({ children, className, ...props }: any) => (
    <nav data-testid="navigation-menu-root" className={className} {...props}>
      {children}
    </nav>
  ),
  List: ({ children, className, ...props }: any) => (
    <ul data-testid="navigation-menu-list" className={className} {...props}>
      {children}
    </ul>
  ),
  Item: ({ children, ...props }: any) => (
    <li data-testid="navigation-menu-item" {...props}>
      {children}
    </li>
  ),
  Trigger: ({ children, className, ...props }: any) => (
    <button data-testid="navigation-menu-trigger" className={className} {...props}>
      {children}
    </button>
  ),
  Content: ({ children, className, ...props }: any) => (
    <div data-testid="navigation-menu-content" className={className} {...props}>
      {children}
    </div>
  ),
  Link: ({ children, ...props }: any) => (
    <a data-testid="navigation-menu-link" {...props}>
      {children}
    </a>
  ),
  Viewport: ({ className, ...props }: any) => (
    <div data-testid="navigation-menu-viewport" className={className} {...props} />
  ),
  Indicator: ({ children, className, ...props }: any) => (
    <div data-testid="navigation-menu-indicator" className={className} {...props}>
      {children}
    </div>
  ),
}));

// Mock lucide-react
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down" />,
}));

describe('NavigationMenu Components', () => {
  describe('NavigationMenu', () => {
    it('renders with default classes and viewport', () => {
      render(
        <NavigationMenu>
          <div>Menu content</div>
        </NavigationMenu>
      );

      const menu = screen.getByTestId('navigation-menu-root');
      expect(menu).toBeInTheDocument();
      expect(menu).toHaveClass(
        'relative', 'z-10', 'flex', 'max-w-max', 'flex-1',
        'items-center', 'justify-center'
      );
      expect(screen.getByText('Menu content')).toBeInTheDocument();
      expect(screen.getByTestId('navigation-menu-viewport')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <NavigationMenu className="custom-menu">
          <div>Menu content</div>
        </NavigationMenu>
      );

      const menu = screen.getByTestId('navigation-menu-root');
      expect(menu).toHaveClass('custom-menu');
      expect(menu).toHaveClass('relative', 'z-10', 'flex');
    });

    it('forwards props correctly', () => {
      render(
        <NavigationMenu data-custom="test">
          <div>Menu content</div>
        </NavigationMenu>
      );

      const menu = screen.getByTestId('navigation-menu-root');
      expect(menu).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('NavigationMenuList', () => {
    it('renders with default classes', () => {
      render(
        <NavigationMenuList>
          <li>List item</li>
        </NavigationMenuList>
      );

      const list = screen.getByTestId('navigation-menu-list');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass(
        'group', 'flex', 'flex-1', 'list-none',
        'items-center', 'justify-center', 'space-x-1'
      );
      expect(screen.getByText('List item')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <NavigationMenuList className="custom-list">
          <li>List item</li>
        </NavigationMenuList>
      );

      const list = screen.getByTestId('navigation-menu-list');
      expect(list).toHaveClass('custom-list');
      expect(list).toHaveClass('group', 'flex', 'flex-1');
    });
  });

  describe('NavigationMenuItem', () => {
    it('renders correctly', () => {
      render(
        <NavigationMenuItem>
          <div>Menu item</div>
        </NavigationMenuItem>
      );

      const item = screen.getByTestId('navigation-menu-item');
      expect(item).toBeInTheDocument();
      expect(screen.getByText('Menu item')).toBeInTheDocument();
    });
  });

  describe('NavigationMenuTrigger', () => {
    it('renders with trigger styles and chevron icon', () => {
      render(
        <NavigationMenuTrigger>
          <span>Trigger text</span>
        </NavigationMenuTrigger>
      );

      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass('group');
      expect(screen.getByText('Trigger text')).toBeInTheDocument();
      expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <NavigationMenuTrigger className="custom-trigger">
          <span>Trigger text</span>
        </NavigationMenuTrigger>
      );

      const trigger = screen.getByTestId('navigation-menu-trigger');
      expect(trigger).toHaveClass('custom-trigger', 'group');
    });
  });

  describe('NavigationMenuContent', () => {
    it('renders with default classes', () => {
      render(
        <NavigationMenuContent>
          <div>Content text</div>
        </NavigationMenuContent>
      );

      const content = screen.getByTestId('navigation-menu-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('left-0', 'top-0', 'w-full');
      expect(screen.getByText('Content text')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <NavigationMenuContent className="custom-content">
          <div>Content text</div>
        </NavigationMenuContent>
      );

      const content = screen.getByTestId('navigation-menu-content');
      expect(content).toHaveClass('custom-content');
      expect(content).toHaveClass('left-0', 'top-0', 'w-full');
    });
  });

  describe('NavigationMenuLink', () => {
    it('renders correctly', () => {
      render(
        <NavigationMenuLink href="/test">
          <span>Link text</span>
        </NavigationMenuLink>
      );

      const link = screen.getByTestId('navigation-menu-link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
      expect(screen.getByText('Link text')).toBeInTheDocument();
    });
  });

  describe('NavigationMenuViewport', () => {
    it('renders with correct structure and classes', () => {
      render(<NavigationMenuViewport />);

      const viewport = screen.getByTestId('navigation-menu-viewport');
      expect(viewport).toBeInTheDocument();
      expect(viewport).toHaveClass(
        'origin-top-center', 'relative', 'mt-1.5',
        'overflow-hidden', 'rounded-md', 'border',
        'bg-popover', 'text-popover-foreground', 'shadow-lg'
      );
    });

    it('merges custom className with default classes', () => {
      render(<NavigationMenuViewport className="custom-viewport" />);

      const viewport = screen.getByTestId('navigation-menu-viewport');
      expect(viewport).toHaveClass('custom-viewport');
      expect(viewport).toHaveClass('origin-top-center', 'relative');
    });
  });

  describe('NavigationMenuIndicator', () => {
    it('renders with correct structure and arrow', () => {
      render(<NavigationMenuIndicator />);

      const indicator = screen.getByTestId('navigation-menu-indicator');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveClass(
        'top-full', 'z-[1]', 'flex', 'h-1.5',
        'items-end', 'justify-center', 'overflow-hidden'
      );

      // Check for the arrow div
      const arrow = indicator.querySelector('div');
      expect(arrow).toBeInTheDocument();
      expect(arrow).toHaveClass(
        'relative', 'top-[60%]', 'h-2', 'w-2',
        'rotate-45', 'rounded-tl-sm', 'bg-border', 'shadow-md'
      );
    });

    it('merges custom className with default classes', () => {
      render(<NavigationMenuIndicator className="custom-indicator" />);

      const indicator = screen.getByTestId('navigation-menu-indicator');
      expect(indicator).toHaveClass('custom-indicator');
      expect(indicator).toHaveClass('top-full', 'z-[1]', 'flex');
    });
  });

  describe('navigationMenuTriggerStyle', () => {
    it('returns correct class string', () => {
      const styles = navigationMenuTriggerStyle();
      expect(typeof styles).toBe('string');
      expect(styles).toContain('bg-muted');
      expect(styles).toContain('border');
      expect(styles).toContain('rounded-md');
    });
  });

  describe('Integration', () => {
    it('renders complete navigation menu structure', () => {
      render(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/products">
                  All Products
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuIndicator />
        </NavigationMenu>
      );

      expect(screen.getByTestId('navigation-menu-root')).toBeInTheDocument();
      expect(screen.getByTestId('navigation-menu-list')).toBeInTheDocument();
      expect(screen.getByTestId('navigation-menu-item')).toBeInTheDocument();
      expect(screen.getByTestId('navigation-menu-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('navigation-menu-content')).toBeInTheDocument();
      expect(screen.getByTestId('navigation-menu-link')).toBeInTheDocument();
      expect(screen.getByTestId('navigation-menu-viewport')).toBeInTheDocument();
      expect(screen.getByTestId('navigation-menu-indicator')).toBeInTheDocument();
      
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('All Products')).toBeInTheDocument();
    });
  });
});