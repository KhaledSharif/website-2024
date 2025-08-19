import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import ProjectPage from '@/app/projects/[slug]/page';
import { getProjectBySlug } from '@/lib/projects-data';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// Mock file system
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

// Mock dynamic imports
jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
  CarouselNext: () => <button data-testid="carousel-next">Next</button>,
  CarouselPrevious: () => <button data-testid="carousel-previous">Previous</button>,
}));

jest.mock('@/components/ui/accordion', () => ({
  Accordion: ({ children }: { children: React.ReactNode }) => <div data-testid="accordion">{children}</div>,
  AccordionContent: ({ children }: { children: React.ReactNode }) => <div data-testid="accordion-content">{children}</div>,
  AccordionItem: ({ children }: { children: React.ReactNode }) => <div data-testid="accordion-item">{children}</div>,
  AccordionTrigger: ({ children }: { children: React.ReactNode }) => <button data-testid="accordion-trigger">{children}</button>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, priority, sizes }: { src: string; alt: string; priority?: boolean; sizes?: string }) => <img src={src} alt={alt} data-testid="next-image" />,
}));

// Mock PageLayout component
jest.mock('@/components/page-layout', () => ({
  __esModule: true,
  default: ({ title, titleIcon, description, children, additionalContent }: any) => (
    <div data-testid="page-layout">
      <h1>{titleIcon} {title}</h1>
      <p>{description}</p>
      {children && <div data-testid="children">{children}</div>}
      {additionalContent && <div data-testid="additional-content">{additionalContent}</div>}
    </div>
  ),
}));

// Mock SourceCodeButton component
jest.mock('@/components/source-code', () => ({
  __esModule: true,
  default: ({ url }: { url: string }) => <a href={url} data-testid="source-code-button">Source Code</a>,
}));

const mockFs = require('fs');

describe('ProjectPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFs.promises.readFile.mockResolvedValue('# Test Markdown Content');
  });

  describe('generateStaticParams', () => {
    it('should generate static params for all projects', async () => {
      const { generateStaticParams } = await import('@/app/projects/[slug]/page');
      const params = await generateStaticParams();
      
      expect(params).toEqual([
        { slug: 'astrobee' },
        { slug: 'ros-vslam' },
        { slug: 'omniverse-gym' },
        { slug: 'robot-transformers' },
      ]);
    });
  });

  describe('ProjectPage component', () => {
    it('should render astrobee project with carousel', async () => {
      const project = getProjectBySlug('astrobee');
      expect(project).toBeDefined();

      const { default: ProjectPageComponent } = await import('@/app/projects/[slug]/page');
      const { container } = render(await ProjectPageComponent({ params: { slug: 'astrobee' } }));

      expect(screen.getByText('🐝 Astrobee')).toBeInTheDocument();
      expect(screen.getByText(/This project goes over the Computer Vision/)).toBeInTheDocument();
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
      expect(screen.getByTestId('source-code-button')).toBeInTheDocument();
    });

    it('should render omniverse-gym project with video', async () => {
      const project = getProjectBySlug('omniverse-gym');
      expect(project).toBeDefined();

      const { default: ProjectPageComponent } = await import('@/app/projects/[slug]/page');
      const { container } = render(await ProjectPageComponent({ params: { slug: 'omniverse-gym' } }));

      expect(screen.getByText('🦾 Omniverse Gym')).toBeInTheDocument();
      expect(screen.getByText(/This project shows how to use NVIDIA Omniverse/)).toBeInTheDocument();
      expect(container.querySelector('video')).toBeInTheDocument();
      expect(screen.getByTestId('source-code-button')).toBeInTheDocument();
    });

    it('should render ros-vslam project with accordion', async () => {
      const project = getProjectBySlug('ros-vslam');
      expect(project).toBeDefined();

      const { default: ProjectPageComponent } = await import('@/app/projects/[slug]/page');
      const { container } = render(await ProjectPageComponent({ params: { slug: 'ros-vslam' } }));

      expect(screen.getByText('🗺️ Visual SLAM')).toBeInTheDocument();
      expect(screen.getByText(/This project has code for running Visual SLAM/)).toBeInTheDocument();
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
      expect(screen.getByTestId('source-code-button')).toBeInTheDocument();
    });

    it('should call notFound for invalid slug', async () => {
      const { default: ProjectPageComponent } = await import('@/app/projects/[slug]/page');
      
      try {
        await ProjectPageComponent({ params: { slug: 'invalid-slug' } });
      } catch (error) {
        // Expected to throw due to notFound
      }

      expect(notFound).toHaveBeenCalled();
    });

    it('should call notFound when markdown file is missing', async () => {
      mockFs.promises.readFile.mockRejectedValue(new Error('File not found'));

      const { default: ProjectPageComponent } = await import('@/app/projects/[slug]/page');
      
      try {
        await ProjectPageComponent({ params: { slug: 'astrobee' } });
      } catch (error) {
        // Expected to throw due to notFound
      }

      expect(notFound).toHaveBeenCalled();
    });
  });

  describe('getMarkdownContent', () => {
    it('should read markdown file from correct path', async () => {
      const { default: ProjectPageComponent } = await import('@/app/projects/[slug]/page');
      
      await ProjectPageComponent({ params: { slug: 'astrobee' } });

      expect(mockFs.promises.readFile).toHaveBeenCalledWith(
        expect.stringMatching(/content[\\\/]projects[\\\/]astrobee\.md$/),
        'utf-8'
      );
    });
  });
}); 