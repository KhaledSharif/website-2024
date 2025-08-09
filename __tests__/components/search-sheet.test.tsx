import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchSheet } from '@/components/search-sheet'

// Mock the search data
jest.mock('@/lib/search-data', () => ({
  searchItems: jest.fn((query) => {
    if (query.toLowerCase().includes('astrobee')) {
      return [{
        id: 'astrobee',
        title: 'Astrobee',
        description: 'Computer Vision code for robots on ISS',
        url: '/projects/astrobee',
        category: 'project',
        tags: ['computer vision', 'robotics'],
        emoji: '🐝'
      }]
    }
    if (query.toLowerCase().includes('slam')) {
      return [{
        id: 'slam',
        title: 'Visual SLAM',
        description: 'SLAM implementation',
        url: '/projects/ros-vslam',
        category: 'project',
        tags: ['slam', 'visual'],
        emoji: '🗺️'
      }]
    }
    if (query.toLowerCase().includes('note')) {
      return [{
        id: 'test-note',
        title: 'Test Note',
        description: 'A test note',
        url: '/notes/test',
        category: 'note',
        tags: ['notes'],
        emoji: '📝'
      }]
    }
    if (query.toLowerCase().includes('unknown')) {
      return [{
        id: 'unknown',
        title: 'Unknown Category',
        description: 'Something with unknown category',
        url: '/unknown',
        category: 'unknown',
        tags: ['unknown'],
        emoji: '❓'
      }]
    }
    if (query.toLowerCase().includes('multiple')) {
      return [
        {
          id: 'item1',
          title: 'First Item',
          description: 'First description',
          url: '/item1',
          category: 'project',
          tags: ['test'],
          emoji: '1️⃣'
        },
        {
          id: 'item2',
          title: 'Second Item',
          description: 'Second description',
          url: '/item2',
          category: 'project',
          tags: ['test'],
          emoji: '2️⃣'
        }
      ]
    }
    return []
  })
}))

describe('SearchSheet Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render search trigger button', () => {
    render(<SearchSheet />)
    const searchButton = screen.getByRole('button', { name: /search/i })
    expect(searchButton).toBeInTheDocument()
  })

  it('should open search sheet when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
  })

  it('should focus input when sheet opens', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    const input = screen.getByPlaceholderText(/search/i)
    expect(input).toHaveFocus()
  })

  it('should search when user types', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type search query
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'astrobee')
    })
    
    // Wait for search results
    await waitFor(() => {
      expect(screen.getByText('Astrobee')).toBeInTheDocument()
    })
  })

  it('should clear results when query is empty', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type and then clear
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'astrobee')
      await user.clear(input)
    })
    
    // Results should be cleared
    await waitFor(() => {
      expect(screen.queryByText('Astrobee')).not.toBeInTheDocument()
    })
  })

  it('should handle keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type to get results
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'slam')
    })
    
    await waitFor(() => {
      expect(screen.getByText('Visual SLAM')).toBeInTheDocument()
    })
    
    // Test arrow key navigation - find the outer container that should have bg-muted class
    await act(async () => {
      await user.keyboard('{ArrowDown}')
    })
    const resultContainer = screen.getByText('Visual SLAM').closest('div[class*="bg-muted"]')
    expect(resultContainer).toHaveClass('bg-muted')
  })

  it('should close sheet on escape key', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Press escape
    await act(async () => {
      await user.keyboard('{Escape}')
    })
    
    // Sheet should be closed
    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument()
  })

  it('should navigate to result on enter key', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type to get results
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'astrobee')
    })
    
    await waitFor(() => {
      expect(screen.getByText('Astrobee')).toBeInTheDocument()
    })
    
    // Press enter to select first result
    await act(async () => {
      await user.keyboard('{Enter}')
    })
    
    // Sheet should close after navigation
    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument()
  })

  it('should show category icons for different result types', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type to get results
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'astrobee')
    })
    
    await waitFor(() => {
      expect(screen.getByText('Project')).toBeInTheDocument()
    })
  })

  it('should debounce search requests', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    const input = screen.getByPlaceholderText(/search/i)
    
    // Type quickly - should not trigger multiple searches immediately
    await act(async () => {
      await user.type(input, 'a')
      await user.type(input, 's')
      await user.type(input, 't')
      await user.type(input, 'r')
      await user.type(input, 'o')
      await user.type(input, 'b')
      await user.type(input, 'e')
      await user.type(input, 'e')
    })
    
    // Wait for debounced search
    await waitFor(() => {
      expect(screen.getByText('Astrobee')).toBeInTheDocument()
    }, { timeout: 200 })
  })

  it('should reset state when sheet closes', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type something
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'astrobee')
    })
    
    // Close sheet
    await act(async () => {
      await user.keyboard('{Escape}')
    })
    
    // Reopen sheet
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Input should be empty
    const newInput = screen.getByPlaceholderText(/search/i)
    expect(newInput).toHaveValue('')
  })

  it('should handle ArrowUp when already at first result', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type to get results
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'multiple')
    })
    
    await waitFor(() => {
      expect(screen.getByText('First Item')).toBeInTheDocument()
    })
    
    // Arrow up from first item should stay at first item
    await act(async () => {
      await user.keyboard('{ArrowUp}')
    })
    
    // First item should still be selected
    const firstResult = screen.getByText('First Item').closest('div[class*="bg-muted"]')
    expect(firstResult).toHaveClass('bg-muted')
  })

  it('should handle ArrowDown at last result', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type to get results
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'multiple')
    })
    
    await waitFor(() => {
      expect(screen.getByText('First Item')).toBeInTheDocument()
      expect(screen.getByText('Second Item')).toBeInTheDocument()
    })
    
    // Navigate to last item
    await act(async () => {
      await user.keyboard('{ArrowDown}')
    })
    
    // Try to go past last item - should stay at last item
    await act(async () => {
      await user.keyboard('{ArrowDown}')
    })
    
    // Second item should still be selected
    const secondResult = screen.getByText('Second Item').closest('div[class*="bg-muted"]')
    expect(secondResult).toHaveClass('bg-muted')
  })

  it('should click on search result to navigate', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type to get results
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'astrobee')
    })
    
    await waitFor(() => {
      expect(screen.getByText('Astrobee')).toBeInTheDocument()
    })
    
    // Click on the result
    const resultDiv = screen.getByText('Astrobee').closest('div[class*="cursor-pointer"]')
    await act(async () => {
      await user.click(resultDiv!)
    })
    
    // Sheet should close after navigation
    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument()
  })

  it('should show "Note" category for note items', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type to get note results
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'note')
    })
    
    await waitFor(() => {
      expect(screen.getByText('Test Note')).toBeInTheDocument()
      expect(screen.getByText('Note')).toBeInTheDocument()
    })
  })

  it('should show "Other" category for unknown categories', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type to get unknown category results
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'unknown')
    })
    
    await waitFor(() => {
      expect(screen.getByText('Unknown Category')).toBeInTheDocument()
      expect(screen.getByText('Other')).toBeInTheDocument()
    })
  })

  it('should show singular "result" for single result', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type to get single result
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'astrobee')
    })
    
    await waitFor(() => {
      expect(screen.getByText('1 result found')).toBeInTheDocument()
    })
  })

  it('should show plural "results" for multiple results', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type to get multiple results
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'multiple')
    })
    
    await waitFor(() => {
      expect(screen.getByText('2 results found')).toBeInTheDocument()
    })
  })

  it('should show no results message', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type query with no results
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'nonexistent')
    })
    
    await waitFor(() => {
      expect(screen.getByText('No results found for "nonexistent"')).toBeInTheDocument()
      expect(screen.getByText('Try different keywords or check spelling')).toBeInTheDocument()
    })
  })

  it('should show loading state', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type to trigger search
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'a')
    })
    
    // Loading spinner should appear briefly - look for it by class instead
    expect(document.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('should handle Enter key when no result is selected', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Press enter without any results or selection
    await act(async () => {
      await user.keyboard('{Enter}')
    })
    
    // Sheet should remain open since no result was selected
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
  })

  it('should handle Enter key when selectedIndex is invalid', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Type to get results but don't navigate
    const input = screen.getByPlaceholderText(/search/i)
    await act(async () => {
      await user.type(input, 'astrobee')
    })
    
    await waitFor(() => {
      expect(screen.getByText('Astrobee')).toBeInTheDocument()
    })
    
    // Clear results to make selectedIndex invalid
    await act(async () => {
      await user.clear(input)
    })
    
    // Press enter with invalid selectedIndex
    await act(async () => {
      await user.keyboard('{Enter}')
    })
    
    // Sheet should remain open
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
  })

  it('should handle keyboard events when sheet is closed', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Don't open the sheet, just try keyboard navigation
    await act(async () => {
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{ArrowUp}')
      await user.keyboard('{Enter}')
      await user.keyboard('{Escape}')
    })
    
    // Sheet should remain closed
    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument()
  })

  it('should show empty state message', async () => {
    const user = userEvent.setup()
    render(<SearchSheet />)
    
    // Open search sheet
    const searchButton = screen.getByRole('button', { name: /search/i })
    await act(async () => {
      await user.click(searchButton)
    })
    
    // Should show empty state when no query
    expect(screen.getByText('Start typing to search...')).toBeInTheDocument()
    expect(screen.getByText('Search through projects and notes')).toBeInTheDocument()
  })
}) 