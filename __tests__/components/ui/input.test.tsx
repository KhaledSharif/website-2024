import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/ui/input'

describe('Input Component', () => {
  it('should render with default props', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('should render with placeholder', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  it('should handle value changes', async () => {
    const user = userEvent.setup()
    render(<Input />)
    const input = screen.getByRole('textbox')
    
    await user.type(input, 'test value')
    expect(input).toHaveValue('test value')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('should apply custom className', () => {
    render(<Input className="custom-class" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('should handle different input types', () => {
    const { rerender } = render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" />)
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password')

    rerender(<Input type="number" />)
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number')
  })

  it('should handle controlled input', () => {
    const TestComponent = () => {
      const [value, setValue] = React.useState('')
      return (
        <Input 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />
      )
    }
    
    render(<TestComponent />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('')
  })

  it('should handle onFocus and onBlur events', async () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    const user = userEvent.setup()
    
    render(<Input onFocus={onFocus} onBlur={onBlur} />)
    const input = screen.getByRole('textbox')
    
    await user.click(input)
    expect(onFocus).toHaveBeenCalledTimes(1)
    
    await user.tab()
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('should have proper accessibility attributes', () => {
    render(<Input aria-label="Test input" />)
    const input = screen.getByRole('textbox', { name: /test input/i })
    expect(input).toBeInTheDocument()
  })

  it('should handle required attribute', () => {
    render(<Input required />)
    const input = screen.getByRole('textbox')
    expect(input).toBeRequired()
  })

  it('should handle maxLength attribute', () => {
    render(<Input maxLength={10} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('maxLength', '10')
  })
}) 