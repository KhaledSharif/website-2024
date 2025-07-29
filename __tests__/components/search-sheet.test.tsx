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
}) 