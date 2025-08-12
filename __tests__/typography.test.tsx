import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Features from '@/components/features';
import Hero from '@/components/hero';
import SourceCodeButton from '@/components/source-code';
import ProjectsPage from '@/app/projects/page';
import NotesPage from '@/app/notes/page';
import PageLayout from '@/components/page-layout';
import { testFontClasses } from './utils/assertions';

// Use centralized mocks
jest.mock('react-markdown', () => require('./utils/mocks').reactMarkdownMock());
jest.mock('remark-gfm', () => require('./utils/mocks').remarkGfmMock());
jest.mock('@headlessui/react', () => require('./utils/mocks').headlessUIMock());
jest.mock('next/image', () => require('./utils/mocks').nextImageMock());
jest.mock('next/link', () => require('./utils/mocks').nextLinkMock());
jest.mock('@phosphor-icons/react', () => require('./utils/mocks').phosphorIconsMock());
jest.mock('@/lib/projects-data', () => require('./utils/mocks').projectsDataMock());
jest.mock('@/lib/notes-data', () => require('./utils/mocks').notesDataMock());

describe('Typography Font System', () => {
  describe('Font Display Usage', () => {
    it('should apply font-display to Features component headings', () => {
      render(<Features />);
      
      // Check specific headings
      const projectsHeading = screen.getByText(/Open source projects/);
      testFontClasses(projectsHeading, 'font-display');
      
      const rlHeading = screen.getByText('Robot Reinforcement Learning');
      testFontClasses(rlHeading, 'font-display');
      
      const vslamHeading = screen.getByText('Robot Visual Localization');
      testFontClasses(vslamHeading, 'font-display');
      
      const coopHeading = screen.getByText('Robot Cooperative Planning');
      testFontClasses(coopHeading, 'font-display');
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
      testFontClasses(rlDescription, 'font-sans');
    });

    it('should apply font-sans to Hero component paragraph', () => {
      render(<Hero />);
      const paragraph = screen.getByText(/Hi there! 👋🏼 I'm Khaled/);
      testFontClasses(paragraph, 'font-sans');
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
      testFontClasses(buttonText, 'font-accent');
    });

    it('should apply font-accent to all Source Code buttons in Features', () => {
      render(<Features />);
      const sourceCodeButtons = screen.getAllByText('Source Code');
      sourceCodeButtons.forEach(button => {
        testFontClasses(button, 'font-accent');
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