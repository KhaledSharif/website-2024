import { render, screen } from '@testing-library/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

// Mock @radix-ui/react-accordion
jest.mock('@radix-ui/react-accordion', () => ({
  Root: ({ children, ...props }: any) => <div data-testid="accordion-root" {...props}>{children}</div>,
  Item: ({ children, className, ...props }: any) => (
    <div data-testid="accordion-item" className={className} {...props}>{children}</div>
  ),
  Header: ({ children, className, ...props }: any) => (
    <div data-testid="accordion-header" className={className} {...props}>{children}</div>
  ),
  Trigger: ({ children, className, ...props }: any) => (
    <button data-testid="accordion-trigger" className={className} {...props}>{children}</button>
  ),
  Content: ({ children, className, ...props }: any) => (
    <div data-testid="accordion-content" className={className} {...props}>{children}</div>
  ),
}));

// Mock lucide-react
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down" />,
}));

describe('Accordion Components', () => {
  describe('Accordion Root', () => {
    it('renders correctly', () => {
      render(
        <Accordion>
          <div>Test content</div>
        </Accordion>
      );
      
      expect(screen.getByTestId('accordion-root')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });
  });

  describe('AccordionItem', () => {
    it('renders with default classes', () => {
      render(
        <AccordionItem value="item-1">
          <div>Item content</div>
        </AccordionItem>
      );
      
      const item = screen.getByTestId('accordion-item');
      expect(item).toBeInTheDocument();
      expect(item).toHaveClass('border-b');
      expect(screen.getByText('Item content')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <AccordionItem value="item-1" className="custom-class">
          <div>Item content</div>
        </AccordionItem>
      );
      
      const item = screen.getByTestId('accordion-item');
      expect(item).toHaveClass('border-b', 'custom-class');
    });

    it('forwards props correctly', () => {
      render(
        <AccordionItem value="item-1" data-custom="test">
          <div>Item content</div>
        </AccordionItem>
      );
      
      const item = screen.getByTestId('accordion-item');
      expect(item).toHaveAttribute('data-custom', 'test');
      expect(item).toHaveAttribute('value', 'item-1');
    });
  });

  describe('AccordionTrigger', () => {
    it('renders with default classes and chevron icon', () => {
      render(
        <AccordionTrigger>
          <span>Trigger text</span>
        </AccordionTrigger>
      );
      
      const trigger = screen.getByTestId('accordion-trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveClass(
        'flex', 'flex-1', 'items-center', 'justify-between', 'py-4', 
        'font-medium', 'transition-all', 'hover:underline'
      );
      expect(screen.getByText('Trigger text')).toBeInTheDocument();
      expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    });

    it('merges custom className with default classes', () => {
      render(
        <AccordionTrigger className="custom-trigger">
          <span>Trigger text</span>
        </AccordionTrigger>
      );
      
      const trigger = screen.getByTestId('accordion-trigger');
      expect(trigger).toHaveClass('custom-trigger');
      expect(trigger).toHaveClass('flex', 'flex-1', 'items-center');
    });

    it('forwards props correctly', () => {
      render(
        <AccordionTrigger data-custom="trigger-test">
          <span>Trigger text</span>
        </AccordionTrigger>
      );
      
      const trigger = screen.getByTestId('accordion-trigger');
      expect(trigger).toHaveAttribute('data-custom', 'trigger-test');
    });

    it('renders children and chevron icon', () => {
      render(
        <AccordionTrigger>
          <span>Custom trigger content</span>
        </AccordionTrigger>
      );
      
      expect(screen.getByText('Custom trigger content')).toBeInTheDocument();
      expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    });
  });

  describe('AccordionContent', () => {
    it('renders with default classes', () => {
      render(
        <AccordionContent>
          <div>Content text</div>
        </AccordionContent>
      );
      
      const content = screen.getByTestId('accordion-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass(
        'overflow-hidden', 'text-sm', 'transition-all',
        'data-[state=closed]:animate-accordion-up',
        'data-[state=open]:animate-accordion-down'
      );
      
      // Check inner div
      const innerDiv = content.querySelector('div');
      expect(innerDiv).toHaveClass('pb-4', 'pt-0');
      expect(screen.getByText('Content text')).toBeInTheDocument();
    });

    it('merges custom className with default classes on inner div', () => {
      render(
        <AccordionContent className="custom-content">
          <div>Content text</div>
        </AccordionContent>
      );
      
      const content = screen.getByTestId('accordion-content');
      const innerDiv = content.querySelector('div');
      expect(innerDiv).toHaveClass('pb-4', 'pt-0', 'custom-content');
    });

    it('forwards props correctly', () => {
      render(
        <AccordionContent data-custom="content-test">
          <div>Content text</div>
        </AccordionContent>
      );
      
      const content = screen.getByTestId('accordion-content');
      expect(content).toHaveAttribute('data-custom', 'content-test');
    });
  });

  describe('Integration', () => {
    it('renders complete accordion structure', () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span>Question 1</span>
            </AccordionTrigger>
            <AccordionContent>
              <div>Answer 1</div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <span>Question 2</span>
            </AccordionTrigger>
            <AccordionContent>
              <div>Answer 2</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      
      expect(screen.getByTestId('accordion-root')).toBeInTheDocument();
      expect(screen.getAllByTestId('accordion-item')).toHaveLength(2);
      expect(screen.getAllByTestId('accordion-trigger')).toHaveLength(2);
      expect(screen.getAllByTestId('accordion-content')).toHaveLength(2);
      expect(screen.getByText('Question 1')).toBeInTheDocument();
      expect(screen.getByText('Answer 1')).toBeInTheDocument();
      expect(screen.getByText('Question 2')).toBeInTheDocument();
      expect(screen.getByText('Answer 2')).toBeInTheDocument();
    });
  });
});