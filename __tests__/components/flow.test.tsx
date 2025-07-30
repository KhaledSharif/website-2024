import { render, screen } from '@testing-library/react';
import { AnimatedBeamMultipleInputDemo } from '@/components/flow';

// Mock the AnimatedBeam component
jest.mock('@/components/ui/animated-beam', () => ({
  AnimatedBeam: ({ containerRef, fromRef, toRef }: any) => (
    <div data-testid="animated-beam" data-from={fromRef?.current?.textContent} data-to={toRef?.current?.textContent} />
  ),
}));

describe('AnimatedBeamMultipleInputDemo', () => {
  it('renders the component with correct structure', () => {
    const { container } = render(<AnimatedBeamMultipleInputDemo />);
    
    // Check that the main container is rendered
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders all input circles with correct labels', () => {
    render(<AnimatedBeamMultipleInputDemo />);
    
    // Check for camera inputs
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
    
    // Check for IMU input
    expect(screen.getByText('IMU')).toBeInTheDocument();
    
    // Check for processing center
    expect(screen.getByText('VSLAM')).toBeInTheDocument();
    
    // Check for outputs
    expect(screen.getByText('Pose')).toBeInTheDocument();
    expect(screen.getByText('Map')).toBeInTheDocument();
  });

  it('renders all emoji icons', () => {
    const { container } = render(<AnimatedBeamMultipleInputDemo />);
    
    // Check for emojis in the component
    expect(container).toHaveTextContent('📷'); // Camera emojis for Left and Right
    expect(container).toHaveTextContent('🧭'); // IMU emoji
    expect(container).toHaveTextContent('🧠'); // VSLAM emoji
    expect(container).toHaveTextContent('📍'); // Pose emoji
    expect(container).toHaveTextContent('🗺️'); // Map emoji
  });

  it('applies correct CSS classes to the container', () => {
    const { container } = render(<AnimatedBeamMultipleInputDemo />);
    
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass('relative', 'flex', 'h-full', 'w-full');
    expect(mainDiv).toHaveClass('items-center', 'justify-center', 'overflow-hidden');
    expect(mainDiv).toHaveClass('rounded-lg', 'border', 'bg-background');
    expect(mainDiv).toHaveClass('py-6', 'px-12', 'shadow-md');
  });

  it('renders animated beams', () => {
    render(<AnimatedBeamMultipleInputDemo />);
    
    // Should render multiple AnimatedBeam components
    const beams = screen.getAllByTestId('animated-beam');
    expect(beams.length).toBe(5); // Based on the component structure: 3 inputs to VSLAM + 2 outputs from VSLAM
  });

  it('has proper layout structure with three columns', () => {
    const { container } = render(<AnimatedBeamMultipleInputDemo />);
    
    // The component should have a flex-row layout with three main sections
    const innerContainer = container.querySelector('.flex.flex-row');
    expect(innerContainer).toBeInTheDocument();
    expect(innerContainer).toHaveClass('items-stretch', 'justify-between', 'gap-10');
  });

  it('groups input elements correctly', () => {
    render(<AnimatedBeamMultipleInputDemo />);
    
    // Left column should have Left camera, Right camera, and IMU
    const leftText = screen.getByText('Left');
    const rightText = screen.getByText('Right');
    const imuText = screen.getByText('IMU');
    
    // These should be in the same column (same parent container)
    const leftParent = leftText.closest('.flex.flex-col');
    const rightParent = rightText.closest('.flex.flex-col');
    const imuParent = imuText.closest('.flex.flex-col');
    
    expect(leftParent).toBe(rightParent);
    expect(rightParent).toBe(imuParent);
  });

  it('groups output elements correctly', () => {
    render(<AnimatedBeamMultipleInputDemo />);
    
    // Right column should have Pose and Map
    const poseText = screen.getByText('Pose');
    const mapText = screen.getByText('Map');
    
    // These should be in the same column (same parent container)
    const poseParent = poseText.closest('.flex.flex-col');
    const mapParent = mapText.closest('.flex.flex-col');
    
    expect(poseParent).toBe(mapParent);
  });

  it('centers VSLAM element', () => {
    render(<AnimatedBeamMultipleInputDemo />);
    
    // VSLAM should be in the center column by itself
    const vslamText = screen.getByText('VSLAM');
    const vslamParent = vslamText.closest('.flex.flex-col');
    
    expect(vslamParent).toHaveClass('justify-center');
  });
});