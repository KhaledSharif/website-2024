import { render, screen } from '@testing-library/react';
import { Separator } from '@/components/ui/separator';

// Mock @radix-ui/react-separator
jest.mock('@radix-ui/react-separator', () => ({
  Root: ({ children, className, decorative, orientation, ...props }: any) => (
    <div 
      data-testid="separator-root" 
      className={className} 
      data-decorative={decorative}
      data-orientation={orientation}
      {...props}
    >
      {children}
    </div>
  ),
}));

describe('Separator', () => {
  it('renders with default props', () => {
    render(<Separator />);
    
    const separator = screen.getByTestId('separator-root');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('shrink-0', 'bg-border');
    expect(separator).toHaveAttribute('data-decorative', 'true');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('applies horizontal orientation classes by default', () => {
    render(<Separator />);
    
    const separator = screen.getByTestId('separator-root');
    expect(separator).toHaveClass('h-[1px]', 'w-full');
  });

  it('applies vertical orientation classes when specified', () => {
    render(<Separator orientation="vertical" />);
    
    const separator = screen.getByTestId('separator-root');
    expect(separator).toHaveClass('h-full', 'w-[1px]');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });

  it('merges custom className with default classes', () => {
    render(<Separator className="custom-separator" />);
    
    const separator = screen.getByTestId('separator-root');
    expect(separator).toHaveClass('custom-separator');
    expect(separator).toHaveClass('shrink-0', 'bg-border');
    expect(separator).toHaveClass('h-[1px]', 'w-full');
  });

  it('accepts custom decorative prop', () => {
    render(<Separator decorative={false} />);
    
    const separator = screen.getByTestId('separator-root');
    expect(separator).toHaveAttribute('data-decorative', 'false');
  });

  it('forwards additional props correctly', () => {
    render(<Separator data-custom="test" id="my-separator" />);
    
    const separator = screen.getByTestId('separator-root');
    expect(separator).toHaveAttribute('data-custom', 'test');
    expect(separator).toHaveAttribute('id', 'my-separator');
  });

  it('applies correct classes for horizontal orientation with custom className', () => {
    render(<Separator orientation="horizontal" className="border-red-500" />);
    
    const separator = screen.getByTestId('separator-root');
    expect(separator).toHaveClass('shrink-0', 'bg-border');
    expect(separator).toHaveClass('h-[1px]', 'w-full');
    expect(separator).toHaveClass('border-red-500');
    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('applies correct classes for vertical orientation with custom className', () => {
    render(<Separator orientation="vertical" className="border-blue-500" />);
    
    const separator = screen.getByTestId('separator-root');
    expect(separator).toHaveClass('shrink-0', 'bg-border');
    expect(separator).toHaveClass('h-full', 'w-[1px]');
    expect(separator).toHaveClass('border-blue-500');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });


  describe('orientation prop variations', () => {
    it('handles horizontal orientation explicitly', () => {
      render(<Separator orientation="horizontal" />);
      
      const separator = screen.getByTestId('separator-root');
      expect(separator).toHaveClass('h-[1px]', 'w-full');
      expect(separator).not.toHaveClass('h-full', 'w-[1px]');
    });

    it('handles vertical orientation explicitly', () => {
      render(<Separator orientation="vertical" />);
      
      const separator = screen.getByTestId('separator-root');
      expect(separator).toHaveClass('h-full', 'w-[1px]');
      expect(separator).not.toHaveClass('h-[1px]', 'w-full');
    });
  });

  describe('decorative prop variations', () => {
    it('handles decorative=true explicitly', () => {
      render(<Separator decorative={true} />);
      
      const separator = screen.getByTestId('separator-root');
      expect(separator).toHaveAttribute('data-decorative', 'true');
    });

    it('handles decorative=false explicitly', () => {
      render(<Separator decorative={false} />);
      
      const separator = screen.getByTestId('separator-root');
      expect(separator).toHaveAttribute('data-decorative', 'false');
    });
  });
});