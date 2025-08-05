import { render, screen } from '@testing-library/react';
import NotesPage from '@/app/notes/page';
import { getAllNotes } from '@/lib/notes-data';

// Mock the notes data
jest.mock('@/lib/notes-data', () => ({
  getAllNotes: jest.fn(),
}));

const mockGetAllNotes = getAllNotes as jest.MockedFunction<typeof getAllNotes>;

describe('NotesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render notes page with title and description', () => {
    mockGetAllNotes.mockReturnValue([
      {
        slug: 'test-note',
        name: 'Test Note',
        description: 'A test note description',
        title: 'Test Note',
        titleIcon: '📖',
        breadcrumbLabel: 'Test Note',
      },
    ]);

    render(<NotesPage />);

    expect(screen.getByText('🗒️ Notes')).toBeInTheDocument();
    expect(screen.getByText(/My study notes on Machine Learning and Computer Vision/)).toBeInTheDocument();
  });

  it('should render all notes from data', () => {
    const mockNotes = [
      {
        slug: 'note-1',
        name: 'Note 1',
        description: 'First note description',
        title: 'Note 1',
        titleIcon: '📖',
        breadcrumbLabel: 'Note 1',
      },
      {
        slug: 'note-2',
        name: 'Note 2',
        description: 'Second note description',
        title: 'Note 2',
        titleIcon: '🧭',
        breadcrumbLabel: 'Note 2',
      },
    ];

    mockGetAllNotes.mockReturnValue(mockNotes);

    render(<NotesPage />);

    expect(screen.getByText('📖 Note 1')).toBeInTheDocument();
    expect(screen.getByText('First note description')).toBeInTheDocument();
    expect(screen.getByText('🧭 Note 2')).toBeInTheDocument();
    expect(screen.getByText('Second note description')).toBeInTheDocument();
  });

  it('should create correct links for notes', () => {
    const mockNotes = [
      {
        slug: 'test-note',
        name: 'Test Note',
        description: 'A test note description',
        title: 'Test Note',
        titleIcon: '📖',
        breadcrumbLabel: 'Test Note',
      },
    ];

    mockGetAllNotes.mockReturnValue(mockNotes);

    render(<NotesPage />);

    const noteLink = screen.getByText('📖 Test Note').closest('a');
    expect(noteLink).toHaveAttribute('href', '/notes/test-note');
  });

  it('should render breadcrumb navigation', () => {
    mockGetAllNotes.mockReturnValue([]);

    render(<NotesPage />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Notes')).toBeInTheDocument();
  });

  it('should call getAllNotes to get note data', () => {
    mockGetAllNotes.mockReturnValue([]);

    render(<NotesPage />);

    expect(mockGetAllNotes).toHaveBeenCalledTimes(1);
  });

  it('should render empty state when no notes', () => {
    mockGetAllNotes.mockReturnValue([]);

    render(<NotesPage />);

    expect(screen.getByText('🗒️ Notes')).toBeInTheDocument();
    expect(screen.getByText(/My study notes on Machine Learning and Computer Vision/)).toBeInTheDocument();
  });
}); 