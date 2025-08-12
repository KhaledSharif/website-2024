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
import { testClassNameMerging, testRefForwarding, testPropForwarding } from '../../utils/assertions';

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

    it('merges custom className and forwards ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Card data-testid="card" className="custom-card" ref={ref} id="test-card">
          <div>Card content</div>
        </Card>
      );
      
      const card = screen.getByTestId('card');
      testClassNameMerging(card, 'custom-card', ['rounded-lg', 'border', 'bg-card']);
      testRefForwarding(ref, HTMLDivElement);
      testPropForwarding(card, 'id', 'test-card');
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

    it('merges custom className and forwards ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CardHeader data-testid="card-header" className="custom-header" ref={ref} data-custom="test">
          <div>Header content</div>
        </CardHeader>
      );
      
      const header = screen.getByTestId('card-header');
      testClassNameMerging(header, 'custom-header', ['flex', 'flex-col', 'space-y-1.5']);
      testRefForwarding(ref, HTMLDivElement);
      testPropForwarding(header, 'data-custom', 'test');
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

    it('merges custom className and forwards ref', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<CardTitle className="custom-title" ref={ref} data-custom="test">Card Title</CardTitle>);
      
      const title = screen.getByRole('heading', { level: 3 });
      testClassNameMerging(title, 'custom-title', ['text-2xl', 'font-semibold']);
      testRefForwarding(ref, HTMLHeadingElement);
      testPropForwarding(title, 'data-custom', 'test');
    });
  });

  describe('CardDescription', () => {
    it('renders with all properties correctly', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(
        <CardDescription data-testid="card-description" className="custom-description" ref={ref} data-custom="test">
          Card description text
        </CardDescription>
      );
      
      const description = screen.getByTestId('card-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent('Card description text');
      testClassNameMerging(description, 'custom-description', ['text-[1.05rem]', 'text-muted-foreground']);
      testRefForwarding(ref, HTMLDivElement);
      testPropForwarding(description, 'data-custom', 'test');
    });
  });

  describe('CardContent', () => {
    it('renders with all properties correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CardContent data-testid="card-content" className="custom-content" ref={ref} data-custom="test">
          <div>Content text</div>
        </CardContent>
      );
      
      const content = screen.getByTestId('card-content');
      expect(content).toBeInTheDocument();
      expect(screen.getByText('Content text')).toBeInTheDocument();
      testClassNameMerging(content, 'custom-content', ['p-6', 'pt-0']);
      testRefForwarding(ref, HTMLDivElement);
      testPropForwarding(content, 'data-custom', 'test');
    });
  });

  describe('CardFooter', () => {
    it('renders with all properties correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CardFooter data-testid="card-footer" className="custom-footer" ref={ref} data-custom="test">
          <div>Footer content</div>
        </CardFooter>
      );
      
      const footer = screen.getByTestId('card-footer');
      expect(footer).toBeInTheDocument();
      expect(screen.getByText('Footer content')).toBeInTheDocument();
      testClassNameMerging(footer, 'custom-footer', ['flex', 'items-center', 'p-6', 'pt-0']);
      testRefForwarding(ref, HTMLDivElement);
      testPropForwarding(footer, 'data-custom', 'test');
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