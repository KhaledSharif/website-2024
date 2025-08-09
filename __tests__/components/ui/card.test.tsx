import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default classes', () => {
      render(
        <Card data-testid="card">
          <div>Card content</div>
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass(
        'rounded-lg', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm'
      );
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <Card data-testid="card" className="custom-card">
          <div>Card content</div>
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-card');
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-card');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card ref={ref}>
          <div>Card content</div>
        </Card>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards props correctly', () => {
      render(
        <Card data-testid="card" id="test-card" role="region">
          <div>Card content</div>
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('id', 'test-card');
      expect(card).toHaveAttribute('role', 'region');
    });
  });

  describe('CardHeader', () => {
    it('renders with default classes', () => {
      render(
        <CardHeader data-testid="card-header">
          <div>Header content</div>
        </CardHeader>
      );
      
      const header = screen.getByTestId('card-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <CardHeader data-testid="card-header" className="custom-header">
          <div>Header content</div>
        </CardHeader>
      );
      
      const header = screen.getByTestId('card-header');
      expect(header).toHaveClass('custom-header');
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CardHeader ref={ref}>
          <div>Header content</div>
        </CardHeader>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards props correctly', () => {
      render(
        <CardHeader data-testid="card-header" data-custom="test">
          <div>Header content</div>
        </CardHeader>
      );
      
      const header = screen.getByTestId('card-header');
      expect(header).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('CardTitle', () => {
    it('renders as h3 with default classes', () => {
      render(<CardTitle>Card Title</CardTitle>);
      
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass(
        'text-2xl', 'font-semibold', 'leading-none', 'tracking-tight'
      );
      expect(title).toHaveTextContent('Card Title');
    });

    it('merges custom className with default classes', () => {
      render(<CardTitle className="custom-title">Card Title</CardTitle>);
      
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveClass('custom-title');
      expect(title).toHaveClass('text-2xl', 'font-semibold');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<CardTitle ref={ref}>Card Title</CardTitle>);
      
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });

    it('forwards props correctly', () => {
      render(<CardTitle data-custom="test">Card Title</CardTitle>);
      
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('CardDescription', () => {
    it('renders with default classes', () => {
      render(
        <CardDescription data-testid="card-description">
          Card description text
        </CardDescription>
      );
      
      const description = screen.getByTestId('card-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
      expect(description).toHaveTextContent('Card description text');
    });

    it('merges custom className with default classes', () => {
      render(
        <CardDescription data-testid="card-description" className="custom-description">
          Card description text
        </CardDescription>
      );
      
      const description = screen.getByTestId('card-description');
      expect(description).toHaveClass('custom-description');
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(
        <CardDescription ref={ref}>
          Card description text
        </CardDescription>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards props correctly', () => {
      render(
        <CardDescription data-testid="card-description" data-custom="test">
          Card description text
        </CardDescription>
      );
      
      const description = screen.getByTestId('card-description');
      expect(description).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('CardContent', () => {
    it('renders with default classes', () => {
      render(
        <CardContent data-testid="card-content">
          <div>Content text</div>
        </CardContent>
      );
      
      const content = screen.getByTestId('card-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('p-6', 'pt-0');
      expect(screen.getByText('Content text')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <CardContent data-testid="card-content" className="custom-content">
          <div>Content text</div>
        </CardContent>
      );
      
      const content = screen.getByTestId('card-content');
      expect(content).toHaveClass('custom-content');
      expect(content).toHaveClass('p-6', 'pt-0');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CardContent ref={ref}>
          <div>Content text</div>
        </CardContent>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards props correctly', () => {
      render(
        <CardContent data-testid="card-content" data-custom="test">
          <div>Content text</div>
        </CardContent>
      );
      
      const content = screen.getByTestId('card-content');
      expect(content).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('CardFooter', () => {
    it('renders with default classes', () => {
      render(
        <CardFooter data-testid="card-footer">
          <div>Footer content</div>
        </CardFooter>
      );
      
      const footer = screen.getByTestId('card-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <CardFooter data-testid="card-footer" className="custom-footer">
          <div>Footer content</div>
        </CardFooter>
      );
      
      const footer = screen.getByTestId('card-footer');
      expect(footer).toHaveClass('custom-footer');
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CardFooter ref={ref}>
          <div>Footer content</div>
        </CardFooter>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards props correctly', () => {
      render(
        <CardFooter data-testid="card-footer" data-custom="test">
          <div>Footer content</div>
        </CardFooter>
      );
      
      const footer = screen.getByTestId('card-footer');
      expect(footer).toHaveAttribute('data-custom', 'test');
    });
  });

  describe('Integration', () => {
    it('renders complete card structure', () => {
      render(
        <Card data-testid="card">
          <CardHeader data-testid="card-header">
            <CardTitle>Test Card Title</CardTitle>
            <CardDescription data-testid="card-description">
              Test card description
            </CardDescription>
          </CardHeader>
          <CardContent data-testid="card-content">
            <p>Main card content goes here</p>
          </CardContent>
          <CardFooter data-testid="card-footer">
            <button>Action Button</button>
          </CardFooter>
        </Card>
      );
      
      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('card-header')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
      expect(screen.getByTestId('card-description')).toBeInTheDocument();
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
      expect(screen.getByTestId('card-footer')).toBeInTheDocument();
      
      expect(screen.getByText('Test Card Title')).toBeInTheDocument();
      expect(screen.getByText('Test card description')).toBeInTheDocument();
      expect(screen.getByText('Main card content goes here')).toBeInTheDocument();
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });

    it('can be used without all components', () => {
      render(
        <Card data-testid="simple-card">
          <CardContent data-testid="card-content">
            <p>Simple card with just content</p>
          </CardContent>
        </Card>
      );
      
      expect(screen.getByTestId('simple-card')).toBeInTheDocument();
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
      expect(screen.getByText('Simple card with just content')).toBeInTheDocument();
      
      // Should not have other card components
      expect(screen.queryByTestId('card-header')).not.toBeInTheDocument();
      expect(screen.queryByTestId('card-footer')).not.toBeInTheDocument();
    });

    it('handles nested complex content', () => {
      render(
        <Card data-testid="complex-card">
          <CardHeader>
            <CardTitle>Complex Card</CardTitle>
            <CardDescription>
              This card has nested elements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
              <img src="/test.jpg" alt="Test image" />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2">
              <button>Cancel</button>
              <button>Confirm</button>
            </div>
          </CardFooter>
        </Card>
      );
      
      expect(screen.getByTestId('complex-card')).toBeInTheDocument();
      expect(screen.getByText('Complex Card')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByAltText('Test image')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });
  });
});