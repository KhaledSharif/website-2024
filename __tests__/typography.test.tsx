import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Features from '@/components/features';
import Hero from '@/components/hero';
import SourceCodeButton from '@/components/source-code';
import ProjectsPage from '@/app/projects/page';
import NotesPage from '@/app/notes/page';
import PageLayout from '@/components/page-layout';

// Mock react-markdown
jest.mock('react-markdown', () => {
  return function MockMarkdown({ children }: { children: string }) {
    return <div>{children}</div>;
  };
});

jest.mock('remark-gfm', () => () => {});

// Mock Transition from headlessui
jest.mock('@headlessui/react', () => ({
  Transition: ({ children, show }: any) => show ? <>{children}</> : null,
}));

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock Next.js Link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock phosphor-icons
jest.mock('@phosphor-icons/react', () => ({
  ArrowSquareOut: () => <span>ArrowSquareOut</span>,
  CaretCircleDown: () => <span>CaretCircleDown</span>,
  CaretCircleUp: () => <span>CaretCircleUp</span>,
  GithubLogo: () => <span>GithubLogo</span>,
  MagnifyingGlass: () => <span>MagnifyingGlass</span>,
  X: () => <span>X</span>,
  House: () => <span>House</span>,
  FolderOpen: () => <span>FolderOpen</span>,
  Notebook: () => <span>Notebook</span>,
  Plus: () => <span>Plus</span>,
  ArchiveBox: () => <span>ArchiveBox</span>,
  Moon: () => <span>Moon</span>,
  Sun: () => <span>Sun</span>,
  List: () => <span>List</span>,
  PlayCircle: () => <span>PlayCircle</span>,
}));

// Mock headlessui Dialog
jest.mock('@headlessui/react', () => ({
  Transition: Object.assign(
    ({ children, show }: any) => show ? <>{children}</> : null,
    { Child: ({ children }: any) => <>{children}</> }
  ),
  Dialog: Object.assign(
    ({ children, open }: any) => open ? <div>{children}</div> : null,
    { Panel: ({ children }: any) => <div>{children}</div> }
  ),
}));


// Mock the data functions
jest.mock('@/lib/projects-data', () => ({
  getAllProjects: () => [
    {
      slug: 'test-project',
      name: 'Test Project',
      titleIcon: '🚀',
      description: 'Test description',
    },
  ],
}));

jest.mock('@/lib/notes-data', () => ({
  getAllNotes: () => [
    {
      slug: 'test-note',
      name: 'Test Note',
      titleIcon: '📝',
      description: 'Test description',
    },
  ],
}));

describe('Typography Font System', () => {
  describe('Font Display Usage', () => {
    it('should apply font-display to Features component headings', () => {
      render(<Features />);
      
      // Check specific headings
      const projectsHeading = screen.getByText(/Open source projects/);
      expect(projectsHeading).toHaveClass('font-display');
      
      const rlHeading = screen.getByText('Robot Reinforcement Learning');
      expect(rlHeading).toHaveClass('font-display');
      
      const vslamHeading = screen.getByText('Robot Visual Localization');
      expect(vslamHeading).toHaveClass('font-display');
      
      const coopHeading = screen.getByText('Robot Cooperative Planning');
      expect(coopHeading).toHaveClass('font-display');
    });

    it('should apply font-display to Projects page titles', () => {
      const { container } = render(<ProjectsPage />);
      const projectTitles = container.querySelectorAll('.font-display');
      expect(projectTitles.length).toBeGreaterThan(0);
    });

    it('should apply font-display to Notes page titles', () => {
      const { container } = render(<NotesPage />);
      const noteTitles = container.querySelectorAll('.font-display');
      expect(noteTitles.length).toBeGreaterThan(0);
    });
  });

  describe('Font Sans Usage', () => {
    it('should apply font-sans to Features component descriptions', () => {
      render(<Features />);
      
      // Check specific description text
      const rlDescription = screen.getByText(/This repo has examples of how to use NVIDIA Omniverse/);
      expect(rlDescription).toHaveClass('font-sans');
    });

    it('should apply font-sans to Hero component paragraph', () => {
      render(<Hero />);
      const paragraph = screen.getByText(/Hi there! 👋🏼 I'm Khaled/);
      expect(paragraph).toHaveClass('font-sans');
    });

    it('should apply font-sans to Projects page descriptions', () => {
      const { container } = render(<ProjectsPage />);
      const descriptions = container.querySelectorAll('.text-muted-foreground.font-sans');
      expect(descriptions.length).toBeGreaterThan(0);
    });

    it('should apply font-sans to Notes page descriptions', () => {
      const { container } = render(<NotesPage />);
      const descriptions = container.querySelectorAll('.text-muted-foreground.font-sans');
      expect(descriptions.length).toBeGreaterThan(0);
    });
  });

  describe('Font Accent Usage', () => {
    it('should apply font-accent to Source Code button text', () => {
      render(
        <SourceCodeButton url="https://github.com/test/repo" />
      );
      const buttonText = screen.getByText('Source Code');
      expect(buttonText).toHaveClass('font-accent');
    });

    it('should apply font-accent to all Source Code buttons in Features', () => {
      render(<Features />);
      const sourceCodeButtons = screen.getAllByText('Source Code');
      sourceCodeButtons.forEach(button => {
        expect(button).toHaveClass('font-accent');
      });
    });
  });

  describe('CSS Font Inheritance', () => {
    it('should have font classes defined in Tailwind config', () => {
      // This test verifies the configuration is correct
      // In a real scenario, you might import and test the config directly
      const tailwindConfig = require('../tailwind.config.js');
      expect(tailwindConfig.theme.extend.fontFamily).toHaveProperty('sans');
      expect(tailwindConfig.theme.extend.fontFamily).toHaveProperty('display');
      expect(tailwindConfig.theme.extend.fontFamily).toHaveProperty('accent');
      
      // Verify the font families are correctly configured
      expect(tailwindConfig.theme.extend.fontFamily.sans).toContain("'Neuton'");
      expect(tailwindConfig.theme.extend.fontFamily.display).toContain("'Domine'");
      expect(tailwindConfig.theme.extend.fontFamily.accent).toContain("'Quicksand'");
    });
  });

  describe('PageLayout Typography', () => {
    it('should properly render typography in PageLayout component', () => {
      render(
        <PageLayout
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Test' }
          ]}
          title="Test Title"
          titleIcon="🚀"
          description="Test description"
          markdownContent="# Test Heading\n\nTest paragraph with **bold** text."
        />
      );
      
      // The title should be rendered with appropriate styling
      const title = screen.getByText(/Test Title/);
      expect(title).toBeInTheDocument();
      
      // The description should be rendered
      const description = screen.getByText('Test description');
      expect(description).toBeInTheDocument();
    });
  });
});