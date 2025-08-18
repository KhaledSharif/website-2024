# Khaled Sharif - Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This site showcases technical notes, projects, and professional work in an accessible, beautifully formatted presentation.

## 🚀 Features

- **Dynamic Content Management**: File-based content system with markdown support
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Performance Optimized**: Image optimization, code splitting, and fast page loads
- **Accessibility**: WCAG-compliant components with proper ARIA labels
- **Rich Media Support**: Image galleries, video embeds, and interactive components
- **Search Functionality**: Built-in content search across notes and projects
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Variables
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + [AOS](https://michalsnik.github.io/aos/)
- **Content**: Markdown with [GitHub Flavored Markdown](https://github.github.com/gfm/)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/react)
- **Deployment**: Docker + Google Cloud Platform

## 📋 Prerequisites

- Node.js 18+ (see `.nvmrc`)
- npm or yarn package manager
- Git

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/khaledsharif/website-2024.git
cd website-2024
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Available Scripts

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
npm run test:coverage # Generate coverage report (70% threshold)
```

### Code Quality

```bash
npm run lint         # Run ESLint for code quality checks
```

### Deployment

```bash
npm run push         # Build and push Docker image to Google Cloud Registry
```

## 📁 Project Structure

```
website-2024/
├── app/                    # Next.js App Router pages
│   ├── (default)/         # Default route group
│   ├── notes/             # Notes with dynamic routing
│   ├── projects/          # Projects with dynamic routing
│   └── galleries/         # Gallery pages
├── components/            # React components
│   ├── ui/               # Base UI components (Shadcn/ui)
│   └── [feature].tsx     # Feature-specific components
├── content/              # Markdown content
│   ├── notes/           # Technical notes/articles
│   └── projects/        # Project documentation
├── lib/                 # Utilities and data
│   ├── notes-data.ts    # Notes metadata
│   ├── projects-data.ts # Projects metadata
│   └── utils.ts         # Utility functions
├── public/              # Static assets (images, etc.)
├── __tests__/           # Test files
└── styles/              # Global styles
```

## 📝 Adding Content

### Creating a New Note

1. Create a markdown file in `/content/notes/`:

```markdown
# Your Note Title

Your content here...
```

2. Add metadata to `/lib/notes-data.ts`:

```typescript
{
  slug: "your-note-slug",
  title: "Your Note Title",
  description: "Brief description",
  date: "2024-01-01",
  tags: ["tag1", "tag2"]
}
```

### Creating a New Project

1. Create a markdown file in `/content/projects/`:

```markdown
# Project Name

Project description and details...
```

2. Add metadata to `/lib/projects-data.ts`:

```typescript
{
  slug: "project-slug",
  title: "Project Name",
  description: "Brief description",
  technologies: ["Next.js", "TypeScript"],
  githubUrl: "https://github.com/...",
  liveUrl: "https://..."
}
```

## 🎨 Customization

### Theme Configuration

The site uses CSS variables for theming. Modify variables in:

- `/app/globals.css` - Global theme variables
- `tailwind.config.ts` - Tailwind theme extensions

### Typography

Three-font system for visual hierarchy:

- **Neuton**: Body text (sans-serif)
- **Domine**: Display headings
- **Quicksand**: Accent text and buttons

### Component Styling

All UI components use Shadcn/ui with CSS variables. Customize in:

- `/components/ui/` - Base component styles
- CSS variables for consistent theming

## 🧪 Testing

The project maintains 70% code coverage across all metrics:

```bash
# Run tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Test files are located in `/__tests__/` and mirror the source structure.

## 🐳 Docker Deployment

Build and run with Docker:

```bash
# Build Docker image
docker build -t website-2024 .

# Run container
docker run -p 3000:3000 website-2024

# Push to Google Cloud Registry
npm run push
```

The Dockerfile uses multi-stage builds for optimized production images.

## 🚀 Deployment

The site is configured for deployment on Google Cloud Platform:

1. Build the Docker image
2. Push to Google Cloud Registry
3. Deploy to Cloud Run or GKE

Environment variables needed for production:

- `NODE_ENV=production`
- Additional environment-specific variables as needed

## 📊 Performance

### Testing Performance

You can test the site's performance using Google Lighthouse:

1. **Chrome DevTools** (easiest method):
   - Open the site in Chrome
   - Open DevTools (F12)
   - Go to "Lighthouse" tab
   - Click "Analyze page load"

2. **Command Line**:
   ```bash
   # Install Lighthouse CLI
   npm install -g lighthouse
   
   # Run against production build
   npm run build && npm run start
   # In another terminal:
   lighthouse http://localhost:3000 --view
   ```

3. **PageSpeed Insights** (for live sites):
   - Visit https://pagespeed.web.dev/
   - Enter your URL
   - Get detailed performance analysis

### Optimization Features

- **Image Optimization**: Automatic with Next.js Image component and Sharp
- **Code Splitting**: Dynamic imports for optimal bundle size
- **Static Generation**: Pre-rendered pages for fast initial loads
- **Font Optimization**: Next.js font optimization for web fonts
- **Caching**: Optimized caching headers for static assets

## 👤 Author

**Khaled Sharif**

- Website: [khaleds.com](https://khaleds.com)
- GitHub: [@khaledsharif](https://github.com/khaledsharif)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment tools
- Shadcn for the beautiful UI components
- All open-source contributors whose libraries make this possible
