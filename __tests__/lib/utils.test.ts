import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('class1', 'class2', 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toBe('base-class active-class')
  })

  it('should handle false conditional classes', () => {
    const isActive = false
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toBe('base-class')
  })

  it('should handle undefined and null values', () => {
    const result = cn('base-class', undefined, null, 'valid-class')
    expect(result).toBe('base-class valid-class')
  })

  it('should handle empty strings', () => {
    const result = cn('base-class', '', 'valid-class')
    expect(result).toBe('base-class valid-class')
  })

  it('should handle Tailwind classes with conflicts', () => {
    const result = cn('text-red-500', 'text-blue-500')
    expect(result).toBe('text-blue-500') // Last class should win
  })

  it('should handle complex conditional logic', () => {
    const variant = 'primary' as const
    const size = 'large' as const
    const result = cn(
      'base-button',
      variant === 'primary' && 'bg-blue-500',
      size === 'large' && 'px-6 py-3'
    )
    expect(result).toBe('base-button bg-blue-500 px-6 py-3')
  })
}) 