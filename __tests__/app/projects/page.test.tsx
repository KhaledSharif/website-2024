import { render, screen } from '@testing-library/react';
import ProjectsPage from '@/app/projects/page';
import { getAllProjects } from '@/lib/projects-data';

// Mock the projects data
jest.mock('@/lib/projects-data', () => ({
  getAllProjects: jest.fn(),
}));

const mockGetAllProjects = getAllProjects as jest.MockedFunction<typeof getAllProjects>;

describe('ProjectsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render projects page with title and description', () => {
    mockGetAllProjects.mockReturnValue([
      {
        slug: 'test-project',
        name: '🚀 Test Project',
        description: 'A test project description',
        title: 'Test Project',
        titleIcon: '🚀',
        breadcrumbLabel: 'Test Project',
      },
    ]);

    render(<ProjectsPage />);

    expect(screen.getByText('🚀 Projects')).toBeInTheDocument();
    expect(screen.getByText(/My open source projects related to Robotics/)).toBeInTheDocument();
  });

  it('should render all projects from data', () => {
    const mockProjects = [
      {
        slug: 'project-1',
        name: '🐝 Project 1',
        description: 'First project description',
        title: 'Project 1',
        titleIcon: '🐝',
        breadcrumbLabel: 'Project 1',
      },
      {
        slug: 'project-2',
        name: '🗺️ Project 2',
        description: 'Second project description',
        title: 'Project 2',
        titleIcon: '🗺️',
        breadcrumbLabel: 'Project 2',
      },
    ];

    mockGetAllProjects.mockReturnValue(mockProjects);

    render(<ProjectsPage />);

    expect(screen.getByText('🐝 Project 1')).toBeInTheDocument();
    expect(screen.getByText('First project description')).toBeInTheDocument();
    expect(screen.getByText('🗺️ Project 2')).toBeInTheDocument();
    expect(screen.getByText('Second project description')).toBeInTheDocument();
  });

  it('should create correct links for projects', () => {
    const mockProjects = [
      {
        slug: 'test-project',
        name: '🚀 Test Project',
        description: 'A test project description',
        title: 'Test Project',
        titleIcon: '🚀',
        breadcrumbLabel: 'Test Project',
      },
    ];

    mockGetAllProjects.mockReturnValue(mockProjects);

    render(<ProjectsPage />);

    const projectLink = screen.getByText('🚀 Test Project').closest('a');
    expect(projectLink).toHaveAttribute('href', '/projects/test-project');
  });

  it('should render breadcrumb navigation', () => {
    mockGetAllProjects.mockReturnValue([]);

    render(<ProjectsPage />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('should call getAllProjects to get project data', () => {
    mockGetAllProjects.mockReturnValue([]);

    render(<ProjectsPage />);

    expect(mockGetAllProjects).toHaveBeenCalledTimes(1);
  });

  it('should render empty state when no projects', () => {
    mockGetAllProjects.mockReturnValue([]);

    render(<ProjectsPage />);

    expect(screen.getByText('🚀 Projects')).toBeInTheDocument();
    expect(screen.getByText(/My open source projects related to Robotics/)).toBeInTheDocument();
  });
}); 