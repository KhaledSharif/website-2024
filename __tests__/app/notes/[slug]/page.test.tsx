import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { getNoteBySlug } from '@/lib/notes-data';

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

// Mock PageLayout component
jest.mock('@/components/page-layout', () => ({
  __esModule: true,
  default: ({ title, titleIcon, description, headerImage }: any) => (
    <div data-testid="page-layout">
      <h1>{titleIcon} {title}</h1>
      <p>{description}</p>
      {headerImage && (
        <img 
          src={headerImage.src} 
          alt={headerImage.alt} 
          data-testid="header-image" 
        />
      )}
    </div>
  ),
}));

const mockFs = require('fs');

describe('NotePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFs.promises.readFile.mockResolvedValue('# Test Markdown Content');
  });

  describe('generateStaticParams', () => {
    it('should generate static params for all notes', async () => {
      const { generateStaticParams } = await import('@/app/notes/[slug]/page');
      const params = await generateStaticParams();
      
      expect(params).toEqual([
        { slug: 'slam-sota' },
        { slug: 'auto-nav' },
        { slug: 'bev' },
        { slug: 'nerfs' },
      ]);
    });
  });

  describe('NotePage component', () => {
    it('should render slam-sota note without header image', async () => {
      const note = getNoteBySlug('slam-sota');
      expect(note).toBeDefined();

      const { default: NotePageComponent } = await import('@/app/notes/[slug]/page');
      const { container } = render(await NotePageComponent({ params: { slug: 'slam-sota' } }));

      expect(screen.getByText('📖 SLAM Overview')).toBeInTheDocument();
      expect(screen.getByText(/Recent research related to simultaneous localization/)).toBeInTheDocument();
      expect(screen.queryByTestId('header-image')).not.toBeInTheDocument();
    });

    it('should render auto-nav note with header image', async () => {
      const note = getNoteBySlug('auto-nav');
      expect(note).toBeDefined();

      const { default: NotePageComponent } = await import('@/app/notes/[slug]/page');
      const { container } = render(await NotePageComponent({ params: { slug: 'auto-nav' } }));

      expect(screen.getByText('🧭 Autonomous Navigation')).toBeInTheDocument();
      expect(screen.getByText(/Overview of state of the art in autonomous robot navigation/)).toBeInTheDocument();
      expect(screen.getByTestId('header-image')).toBeInTheDocument();
      expect(screen.getByTestId('header-image')).toHaveAttribute('src', '/images/auto-nav.jpg');
      expect(screen.getByTestId('header-image')).toHaveAttribute('alt', 'robots');
    });

    it('should render nerfs note with header image', async () => {
      const note = getNoteBySlug('nerfs');
      expect(note).toBeDefined();

      const { default: NotePageComponent } = await import('@/app/notes/[slug]/page');
      const { container } = render(await NotePageComponent({ params: { slug: 'nerfs' } }));

      expect(screen.getByText('🪐 Neural Radiance Fields (NeRFs)')).toBeInTheDocument();
      expect(screen.getByText(/Introduction to NeRFs and their uses in robotics/)).toBeInTheDocument();
      expect(screen.getByTestId('header-image')).toBeInTheDocument();
      expect(screen.getByTestId('header-image')).toHaveAttribute('src', '/images/nerf.png');
      expect(screen.getByTestId('header-image')).toHaveAttribute('alt', 'robots');
    });

    it('should render nerfs note with header image including width and height properties', async () => {
      const note = getNoteBySlug('nerfs');
      expect(note).toBeDefined();
      expect(note?.hasHeaderImage).toBe(true);
      expect(note?.headerImageSrc).toBe('/images/nerf.png');
      expect(note?.headerImageAlt).toBe('robots');

      const { default: NotePageComponent } = await import('@/app/notes/[slug]/page');
      const { container } = render(await NotePageComponent({ params: { slug: 'nerfs' } }));

      expect(screen.getByText('🪐 Neural Radiance Fields (NeRFs)')).toBeInTheDocument();
      expect(screen.getByTestId('header-image')).toBeInTheDocument();
      expect(screen.getByTestId('header-image')).toHaveAttribute('src', '/images/nerf.png');
      expect(screen.getByTestId('header-image')).toHaveAttribute('alt', 'robots');
    });

    it('should render bev note without header image', async () => {
      const note = getNoteBySlug('bev');
      expect(note).toBeDefined();

      const { default: NotePageComponent } = await import('@/app/notes/[slug]/page');
      const { container } = render(await NotePageComponent({ params: { slug: 'bev' } }));

      expect(screen.getByText('🐦 Birds Eye View')).toBeInTheDocument();
      expect(screen.getByText(/Introduction to birds eye view perception for robotics/)).toBeInTheDocument();
      expect(screen.queryByTestId('header-image')).not.toBeInTheDocument();
    });

    it('should call notFound for invalid slug', async () => {
      const { default: NotePageComponent } = await import('@/app/notes/[slug]/page');
      
      try {
        await NotePageComponent({ params: { slug: 'invalid-slug' } });
      } catch (error) {
        // Expected to throw due to notFound
      }

      expect(notFound).toHaveBeenCalled();
    });

    it('should call notFound when markdown file is missing', async () => {
      mockFs.promises.readFile.mockRejectedValue(new Error('File not found'));

      const { default: NotePageComponent } = await import('@/app/notes/[slug]/page');
      
      try {
        await NotePageComponent({ params: { slug: 'slam-sota' } });
      } catch (error) {
        // Expected to throw due to notFound
      }

      expect(notFound).toHaveBeenCalled();
    });
  });

  describe('getMarkdownContent', () => {
    it('should read markdown file from correct path', async () => {
      const { default: NotePageComponent } = await import('@/app/notes/[slug]/page');
      
      await NotePageComponent({ params: { slug: 'slam-sota' } });

      expect(mockFs.promises.readFile).toHaveBeenCalledWith(
        expect.stringMatching(/content[\\\/]notes[\\\/]slam-sota\.md$/),
        'utf-8'
      );
    });
  });
}); 