import { render, screen, fireEvent } from '@testing-library/react';
import Features from '@/components/features';

// Mock Next.js Image and Link components
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

// Mock @headlessui/react Transition
jest.mock('@headlessui/react', () => ({
  Transition: ({ children, show, unmount, appear, beforeEnter, ...props }: any) => {
    // Filter out Transition-specific props that shouldn't be passed to DOM
    const { 
      enter, enterFrom, enterTo, leave, leaveFrom, leaveTo, 
      className, ...domProps 
    } = props;
    return show ? <div className={className} {...domProps}>{children}</div> : null;
  },
}));

// Mock @phosphor-icons/react
jest.mock('@phosphor-icons/react', () => ({
  ArrowSquareOut: () => <div data-testid="arrow-square-out" />,
  CaretCircleDown: () => <div data-testid="caret-circle-down" />,
  CaretCircleUp: () => <div data-testid="caret-circle-up" />,
  GithubLogo: () => <div data-testid="github-logo" />,
}));

describe('Features', () => {
  beforeEach(() => {
    // Mock clientHeight for heightFix function
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      value: 500,
    });
  });

  it('renders the component with initial state', () => {
    render(<Features />);
    
    expect(screen.getByText('Open source projects 👇🏼')).toBeInTheDocument();
    expect(screen.getByText('View All')).toBeInTheDocument();
    expect(screen.getByText('Robot Reinforcement Learning')).toBeInTheDocument();
    expect(screen.getByText('Robot Visual Localization')).toBeInTheDocument();
    expect(screen.getByText('Robot Cooperative Planning')).toBeInTheDocument();
  });

  it('shows first tab content by default', () => {
    render(<Features />);
    
    expect(screen.getByText(/The NVIDIA Omniverse Isaac Simulator/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /source code/i })).toHaveAttribute('href', 'https://github.com/KhaledSharif/omniverse-gym');
  });

  it('switches to second tab when clicked', () => {
    render(<Features />);
    
    const secondTab = screen.getByText('Robot Visual Localization').closest('div');
    fireEvent.click(secondTab!);
    
    expect(screen.getByText(/This repository provides quickstart Robot Operating/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /source code/i })).toHaveAttribute('href', 'https://github.com/KhaledSharif/ros-vslam');
  });

  it('switches to third tab when clicked', () => {
    render(<Features />);
    
    const thirdTab = screen.getByText('Robot Cooperative Planning').closest('div');
    fireEvent.click(thirdTab!);
    
    expect(screen.getByText(/This repository contains quickstart code to train/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /source code/i })).toHaveAttribute('href', 'https://github.com/KhaledSharif/robot-transformers');
  });

  it('displays correct icons for each tab state', () => {
    render(<Features />);
    
    // First tab should show CaretCircleUp (expanded)
    expect(screen.getAllByTestId('caret-circle-up')).toHaveLength(1);
    expect(screen.getAllByTestId('caret-circle-down')).toHaveLength(2);
    
    // Click second tab
    const secondTab = screen.getByText('Robot Visual Localization').closest('div');
    fireEvent.click(secondTab!);
    
    // Now second tab should show CaretCircleUp
    expect(screen.getAllByTestId('caret-circle-up')).toHaveLength(1);
    expect(screen.getAllByTestId('caret-circle-down')).toHaveLength(2);
  });

  it('renders video elements for each tab', () => {
    render(<Features />);
    
    const videos = screen.getAllByRole('generic').filter(el => 
      el.tagName === 'VIDEO' || el.querySelector('video')
    );
    expect(videos.length).toBeGreaterThan(0);
  });

  it('applies correct CSS classes based on tab state', () => {
    render(<Features />);
    
    const firstTabContainer = screen.getByText('Robot Reinforcement Learning').closest('.flex.items-center');
    const secondTabContainer = screen.getByText('Robot Visual Localization').closest('.flex.items-center');
    
    // First tab should have different styling (active)
    expect(firstTabContainer).toHaveClass('cursor-default');
    expect(secondTabContainer).toHaveClass('cursor-pointer');
    
    // Click second tab
    fireEvent.click(secondTabContainer!);
    
    // Now styling should switch
    expect(firstTabContainer).toHaveClass('cursor-pointer');
    expect(secondTabContainer).toHaveClass('cursor-default');
  });

  it('has proper link attributes for external links', () => {
    render(<Features />);
    
    const githubLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.includes('github.com')
    );
    
    githubLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders all GitHub logos and arrow icons', () => {
    render(<Features />);
    
    // Should have GitHub logos and arrow icons in the expanded tab
    expect(screen.getByTestId('github-logo')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-square-out')).toBeInTheDocument();
  });
});