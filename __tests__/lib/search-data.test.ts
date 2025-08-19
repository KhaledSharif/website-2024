import { searchItems, searchData } from '@/lib/search-data'

describe('searchItems function', () => {
  it('should return empty array for empty query', () => {
    const results = searchItems('')
    expect(results).toEqual([])
  })

  it('should return empty array for whitespace-only query', () => {
    const results = searchItems('   ')
    expect(results).toEqual([])
  })

  it('should find items by title', () => {
    const results = searchItems('Astrobee')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(item => item.title === 'Astrobee')).toBe(true)
  })

  it('should find items by description', () => {
    const results = searchItems('computer vision')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(item => item.title === 'Astrobee')).toBe(true)
  })

  it('should find items by tags', () => {
    const results = searchItems('slam')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(item => item.title === 'Visual SLAM')).toBe(true)
    expect(results.some(item => item.title === 'SLAM Overview')).toBe(true)
  })

  it('should be case insensitive', () => {
    const results1 = searchItems('astrobee')
    const results2 = searchItems('ASTROBEE')
    expect(results1).toEqual(results2)
  })

  it('should find multiple items for broad search terms', () => {
    const results = searchItems('robotics')
    expect(results.length).toBeGreaterThan(1)
  })

  it('should return all items for very broad search', () => {
    const results = searchItems('robot')
    expect(results.length).toBeGreaterThan(0)
  })

  it('should handle partial matches', () => {
    const results = searchItems('vis')
    expect(results.some(item => item.title === 'Visual SLAM')).toBe(true)
  })

  it('should prioritize projects over notes in search results', () => {
    // Create a search that returns both projects and notes
    const results = searchItems('robot')
    
    // Find indices of first project and first note
    const firstProjectIndex = results.findIndex(item => item.category === 'project')
    const firstNoteIndex = results.findIndex(item => item.category === 'note')
    
    // If both exist, project should come before note
    if (firstProjectIndex !== -1 && firstNoteIndex !== -1) {
      expect(firstProjectIndex).toBeLessThan(firstNoteIndex)
    }
  })

  it('should prioritize title matches over other matches', () => {
    // Search for something that appears in both title and description
    const results = searchItems('slam')
    
    // Items with title matches should come first
    let foundNonTitleMatch = false
    for (const item of results) {
      const titleMatch = item.title.toLowerCase().includes('slam')
      
      if (!titleMatch) {
        foundNonTitleMatch = true
      } else if (foundNonTitleMatch) {
        // If we found a title match after a non-title match, ordering is wrong
        fail('Title matches should come before non-title matches')
      }
    }
  })

  it('should sort projects before notes when neither has title match', () => {
    // Mock searchData to have specific test data
    const originalSearchData = [...searchData]
    
    // Create test data with a project and note that both match in description only
    const testData = [
      {
        id: 'note-test',
        title: 'Note Item',
        description: 'contains testquery keyword',
        url: '/notes/test',
        category: 'note' as const,
        tags: [],
        emoji: '📝'
      },
      {
        id: 'project-test',
        title: 'Project Item', 
        description: 'contains testquery keyword',
        url: '/projects/test',
        category: 'project' as const,
        tags: [],
        emoji: '🚀'
      }
    ]
    
    // Replace searchData temporarily
    searchData.length = 0
    searchData.push(...testData)
    
    const results = searchItems('testquery')
    
    // Project should come before note when neither has title match
    expect(results[0].category).toBe('project')
    expect(results[1].category).toBe('note')
    
    // Restore original data
    searchData.length = 0
    searchData.push(...originalSearchData)
  })
})

describe('searchData structure', () => {
  it('should have valid data structure', () => {
    expect(Array.isArray(searchData)).toBe(true)
    expect(searchData.length).toBeGreaterThan(0)
  })

  it('should have required fields for each item', () => {
    searchData.forEach(item => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('title')
      expect(item).toHaveProperty('description')
      expect(item).toHaveProperty('url')
      expect(item).toHaveProperty('category')
      expect(item).toHaveProperty('tags')
      expect(item).toHaveProperty('emoji')
    })
  })

  it('should have valid categories', () => {
    const validCategories = ['project', 'note', 'gallery']
    searchData.forEach(item => {
      expect(validCategories).toContain(item.category)
    })
  })

  it('should have unique IDs', () => {
    const ids = searchData.map(item => item.id)
    const uniqueIds = new Set(ids)
    expect(ids.length).toBe(uniqueIds.size)
  })

  it('should have valid URLs', () => {
    searchData.forEach(item => {
      expect(item.url).toMatch(/^\//)
    })
  })
}) 