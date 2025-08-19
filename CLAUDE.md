# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/blog website built with Next.js 14, TypeScript, and Tailwind CSS. The site presents technical notes and projects in markdown format.

## Essential Commands

### Development

```bash
npm run dev          # Start development server on localhost:3000
npm run build        # Build for production
npm run start        # Start production server
```

### Testing

```bash
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report (90% threshold for branch cov required)
```

### Code Quality

```bash
npm run lint         # Run ESLint
```

### Deployment

```bash
npm run push         # Build and push Docker image to Google Cloud Registry
```

## Architecture Overview

### Content Management System

The site uses a file-based content system:

- Content lives in `/content/notes/` and `/content/projects/` as markdown files
- Metadata is managed in `/lib/notes-data.ts` and `/lib/projects-data.ts`
- Dynamic routes in `/app/notes/[slug]/` and `/app/projects/[slug]/` render content

When adding new content:

1. Create markdown file in appropriate `/content/` directory
2. Add metadata entry to corresponding data file (`/lib/*-data.ts`)
3. Use existing interfaces: `Note` and `Project` types

### Component Architecture

- **Base UI Components**: `/components/ui/` - Shadcn/ui components with CSS variables
- **Feature Components**: `/components/` - Higher-level components
- **Layout System**: `PageLayout`, `Header`, `Footer` provide consistent structure

### Styling System

- **Tailwind CSS**: Utility-first with custom theme
- **CSS Variables**: Dark/light mode theming via CSS custom properties
- **Font System**: Three fonts - Neuton (sans), Domine (display), Quicksand (accent)

### Testing Strategy

- Jest + React Testing Library for unit tests
- Test files in `/__tests__/` mirror source structure
- Coverage thresholds: 70% for all metrics
- Focus on component behavior and utility function correctness

## Key Patterns

### Adding New Features

1. Create components in `/components/` following existing patterns
2. Use TypeScript interfaces for type safety
3. Write corresponding tests in `/__tests__/`
4. Use existing UI components from `/components/ui/` when possible

### Content Updates

1. Markdown files support GitHub Flavored Markdown
2. Images go in `/public/` directory
3. Use relative paths for internal links
4. Videos and carousels are supported via custom components

### State Management

- React hooks for local state
- Context API for theme (dark/light mode)
- No external state management library

### Performance Considerations

- Next.js Image component for optimized images
- Dynamic imports for code splitting
- Sharp for image optimization during build

## Important Notes

- Node.js 20.17+ required (check `.nvmrc`)
- Docker deployment uses standalone Next.js output
- All new components should have corresponding tests
- Maintain 70% test coverage threshold
- Follow existing code style and patterns
