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
    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('Astrobee')
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