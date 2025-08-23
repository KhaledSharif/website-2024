import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb';

// Mock @radix-ui/react-slot
jest.mock('@radix-ui/react-slot', () => ({
  Slot: React.forwardRef(({ children, ...props }: any, ref: any) => 
    React.cloneElement(children, { ...{ ...props, ref }, 'data-testid': 'radix-slot' })
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronRight: () => <div data-testid="chevron-right" />,
  MoreHorizontal: () => <div data-testid="more-horizontal" />,
}));

describe('Breadcrumb Components', () => {
  describe('Breadcrumb', () => {
    it('renders as nav with breadcrumb aria-label', () => {
      render(
        <Breadcrumb data-testid="breadcrumb">
          <div>Breadcrumb content</div>
        </Breadcrumb>
      );
      
      const breadcrumb = screen.getByTestId('breadcrumb');
      expect(breadcrumb).toBeInTheDocument();
      expect(breadcrumb.tagName).toBe('NAV');
      expect(breadcrumb).toHaveAttribute('aria-label', 'breadcrumb');
      expect(screen.getByText('Breadcrumb content')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <Breadcrumb ref={ref}>
          <div>Breadcrumb content</div>
        </Breadcrumb>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe('NAV');
    });

    it('forwards props correctly', () => {
      render(
        <Breadcrumb data-testid="breadcrumb" className="custom-nav" id="nav-id">
          <div>Breadcrumb content</div>
        </Breadcrumb>
      );
      
      const breadcrumb = screen.getByTestId('breadcrumb');
      expect(breadcrumb).toHaveAttribute('id', 'nav-id');
      expect(breadcrumb).toHaveAttribute('class', 'custom-nav');
    });

    it('accepts separator prop (even though not used directly)', () => {
      render(
        <Breadcrumb data-testid="breadcrumb" separator={<span>|</span>}>
          <div>Breadcrumb content</div>
        </Breadcrumb>
      );
      
      expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    });
  });

  describe('BreadcrumbList', () => {
    it('renders as ol with default classes', () => {
      render(
        <BreadcrumbList data-testid="breadcrumb-list">
          <li>List item</li>
        </BreadcrumbList>
      );
      
      const list = screen.getByTestId('breadcrumb-list');
      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe('OL');
      expect(list).toHaveClass(
        'flex', 'flex-wrap', 'items-center', 'gap-1.5',
        'break-words', 'text-sm', 'text-muted-foreground', 'sm:gap-2.5'
      );
      expect(screen.getByText('List item')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <BreadcrumbList data-testid="breadcrumb-list" className="custom-list">
          <li>List item</li>
        </BreadcrumbList>
      );
      
      const list = screen.getByTestId('breadcrumb-list');
      expect(list).toHaveClass('custom-list');
      expect(list).toHaveClass('flex', 'flex-wrap', 'items-center');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLOListElement>();
      render(
        <BreadcrumbList ref={ref}>
          <li>List item</li>
        </BreadcrumbList>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLOListElement);
    });

    it('forwards props correctly', () => {
      render(
        <BreadcrumbList data-testid="breadcrumb-list" data-custom="test">
          <li>List item</li>
        </BreadcrumbList>
      );
      
      const list = screen.getByTestId('breadcrumb-list');
      expect(list).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('BreadcrumbItem', () => {
    it('renders as li with default classes', () => {
      render(
        <BreadcrumbItem data-testid="breadcrumb-item">
          <span>Item content</span>
        </BreadcrumbItem>
      );
      
      const item = screen.getByTestId('breadcrumb-item');
      expect(item).toBeInTheDocument();
      expect(item.tagName).toBe('LI');
      expect(item).toHaveClass('inline-flex', 'items-center', 'gap-1.5');
      expect(screen.getByText('Item content')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <BreadcrumbItem data-testid="breadcrumb-item" className="custom-item">
          <span>Item content</span>
        </BreadcrumbItem>
      );
      
      const item = screen.getByTestId('breadcrumb-item');
      expect(item).toHaveClass('custom-item');
      expect(item).toHaveClass('inline-flex', 'items-center', 'gap-1.5');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLLIElement>();
      render(
        <BreadcrumbItem ref={ref}>
          <span>Item content</span>
        </BreadcrumbItem>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });

    it('forwards props correctly', () => {
      render(
        <BreadcrumbItem data-testid="breadcrumb-item" data-custom="test">
          <span>Item content</span>
        </BreadcrumbItem>
      );
      
      const item = screen.getByTestId('breadcrumb-item');
      expect(item).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('BreadcrumbLink', () => {
    it('renders as anchor with default classes', () => {
      render(
        <BreadcrumbLink data-testid="breadcrumb-link" href="/test">
          Link text
        </BreadcrumbLink>
      );
      
      const link = screen.getByTestId('breadcrumb-link');
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveClass('transition-colors', 'hover:text-foreground');
      expect(link).toHaveAttribute('href', '/test');
      expect(screen.getByText('Link text')).toBeInTheDocument();
    });

    it('renders as Slot when asChild is true', () => {
      render(
        <BreadcrumbLink asChild data-testid="breadcrumb-link">
          <button>Button as link</button>
        </BreadcrumbLink>
      );
      
      expect(screen.getByTestId('radix-slot')).toBeInTheDocument();
      expect(screen.getByText('Button as link')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <BreadcrumbLink data-testid="breadcrumb-link" className="custom-link" href="/test">
          Link text
        </BreadcrumbLink>
      );
      
      const link = screen.getByTestId('breadcrumb-link');
      expect(link).toHaveClass('custom-link');
      expect(link).toHaveClass('transition-colors', 'hover:text-foreground');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <BreadcrumbLink ref={ref} href="/test">
          Link text
        </BreadcrumbLink>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it('forwards props correctly', () => {
      render(
        <BreadcrumbLink data-testid="breadcrumb-link" data-custom="test" href="/test">
          Link text
        </BreadcrumbLink>
      );
      
      const link = screen.getByTestId('breadcrumb-link');
      expect(link).toHaveAttribute('data-custom', 'test');
    });

    it('handles asChild false explicitly', () => {
      render(
        <BreadcrumbLink asChild={false} data-testid="breadcrumb-link" href="/test">
          Link text
        </BreadcrumbLink>
      );
      
      const link = screen.getByTestId('breadcrumb-link');
      expect(link.tagName).toBe('A');
      expect(screen.queryByTestId('radix-slot')).not.toBeInTheDocument();
    });
  });

  describe('BreadcrumbPage', () => {
    it('renders as span with correct attributes and classes', () => {
      render(
        <BreadcrumbPage data-testid="breadcrumb-page">
          Current page
        </BreadcrumbPage>
      );
      
      const page = screen.getByTestId('breadcrumb-page');
      expect(page).toBeInTheDocument();
      expect(page.tagName).toBe('SPAN');
      expect(page).toHaveAttribute('role', 'link');
      expect(page).toHaveAttribute('aria-disabled', 'true');
      expect(page).toHaveAttribute('aria-current', 'page');
      expect(page).toHaveClass('font-normal', 'text-foreground');
      expect(screen.getByText('Current page')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <BreadcrumbPage data-testid="breadcrumb-page" className="custom-page">
          Current page
        </BreadcrumbPage>
      );
      
      const page = screen.getByTestId('breadcrumb-page');
      expect(page).toHaveClass('custom-page');
      expect(page).toHaveClass('font-normal', 'text-foreground');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(
        <BreadcrumbPage ref={ref}>
          Current page
        </BreadcrumbPage>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('forwards props correctly', () => {
      render(
        <BreadcrumbPage data-testid="breadcrumb-page" data-custom="test">
          Current page
        </BreadcrumbPage>
      );
      
      const page = screen.getByTestId('breadcrumb-page');
      expect(page).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('BreadcrumbSeparator', () => {
    it('renders as li with default ChevronRight icon', () => {
      render(<BreadcrumbSeparator data-testid="breadcrumb-separator" />);
      
      const separator = screen.getByTestId('breadcrumb-separator');
      expect(separator).toBeInTheDocument();
      expect(separator.tagName).toBe('LI');
      expect(separator).toHaveAttribute('role', 'presentation');
      expect(separator).toHaveAttribute('aria-hidden', 'true');
      expect(separator).toHaveClass('[&>svg]:size-3.5');
      expect(screen.getByTestId('chevron-right')).toBeInTheDocument();
    });

    it('renders custom children instead of default icon', () => {
      render(
        <BreadcrumbSeparator data-testid="breadcrumb-separator">
          <span>/</span>
        </BreadcrumbSeparator>
      );
      
      const separator = screen.getByTestId('breadcrumb-separator');
      expect(separator).toBeInTheDocument();
      expect(screen.getByText('/')).toBeInTheDocument();
      expect(screen.queryByTestId('chevron-right')).not.toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <BreadcrumbSeparator data-testid="breadcrumb-separator" className="custom-separator">
          <span>|</span>
        </BreadcrumbSeparator>
      );
      
      const separator = screen.getByTestId('breadcrumb-separator');
      expect(separator).toHaveClass('custom-separator');
      expect(separator).toHaveClass('[&>svg]:size-3.5');
    });

    it('forwards props correctly', () => {
      render(
        <BreadcrumbSeparator data-testid="breadcrumb-separator" data-custom="test" />
      );
      
      const separator = screen.getByTestId('breadcrumb-separator');
      expect(separator).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('BreadcrumbEllipsis', () => {
    it('renders as span with MoreHorizontal icon', () => {
      render(<BreadcrumbEllipsis data-testid="breadcrumb-ellipsis" />);
      
      const ellipsis = screen.getByTestId('breadcrumb-ellipsis');
      expect(ellipsis).toBeInTheDocument();
      expect(ellipsis.tagName).toBe('SPAN');
      expect(ellipsis).toHaveAttribute('role', 'presentation');
      expect(ellipsis).toHaveAttribute('aria-hidden', 'true');
      expect(ellipsis).toHaveClass(
        'flex', 'h-9', 'w-9', 'items-center', 'justify-center'
      );
      expect(screen.getByTestId('more-horizontal')).toBeInTheDocument();
      expect(screen.getByText('More')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <BreadcrumbEllipsis data-testid="breadcrumb-ellipsis" className="custom-ellipsis" />
      );
      
      const ellipsis = screen.getByTestId('breadcrumb-ellipsis');
      expect(ellipsis).toHaveClass('custom-ellipsis');
      expect(ellipsis).toHaveClass('flex', 'h-9', 'w-9', 'items-center', 'justify-center');
    });

    it('forwards props correctly', () => {
      render(
        <BreadcrumbEllipsis data-testid="breadcrumb-ellipsis" data-custom="test" />
      );
      
      const ellipsis = screen.getByTestId('breadcrumb-ellipsis');
      expect(ellipsis).toHaveAttribute('data-custom', 'test');
    });

    it('has screen reader text for accessibility', () => {
      render(<BreadcrumbEllipsis />);
      
      const moreText = screen.getByText('More');
      expect(moreText).toBeInTheDocument();
      expect(moreText).toHaveClass('sr-only');
    });
  });

  describe('Integration', () => {
    it('renders complete breadcrumb structure', () => {
      render(
        <Breadcrumb data-testid="breadcrumb">
          <BreadcrumbList data-testid="breadcrumb-list">
            <BreadcrumbItem data-testid="breadcrumb-item-1">
              <BreadcrumbLink data-testid="breadcrumb-link" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator data-testid="breadcrumb-separator" />
            <BreadcrumbItem data-testid="breadcrumb-item-2">
              <BreadcrumbLink href="/products">
                Products
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem data-testid="breadcrumb-item-3">
              <BreadcrumbPage data-testid="breadcrumb-page">
                Current Product
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      
      expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
      expect(screen.getByTestId('breadcrumb-list')).toBeInTheDocument();
      expect(screen.getByTestId('breadcrumb-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('breadcrumb-link')).toBeInTheDocument();
      expect(screen.getByTestId('breadcrumb-separator')).toBeInTheDocument();
      expect(screen.getByTestId('breadcrumb-item-2')).toBeInTheDocument();
      expect(screen.getByTestId('breadcrumb-item-3')).toBeInTheDocument();
      expect(screen.getByTestId('breadcrumb-page')).toBeInTheDocument();
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Current Product')).toBeInTheDocument();
    });

    it('renders breadcrumb with ellipsis', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis data-testid="ellipsis" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByTestId('ellipsis')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();
      expect(screen.getByTestId('more-horizontal')).toBeInTheDocument();
    });

    it('handles custom separators', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <span data-testid="custom-separator">→</span>
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      
      expect(screen.getByTestId('custom-separator')).toBeInTheDocument();
      expect(screen.getByText('→')).toBeInTheDocument();
      expect(screen.queryByTestId('chevron-right')).not.toBeInTheDocument();
    });
  });
});