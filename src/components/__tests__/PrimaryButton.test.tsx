import { render, screen, fireEvent } from '@testing-library/react'
import PrimaryButton from '../PrimaryButton'

describe('PrimaryButton', () => {
    it('renders with text', () => {
        render(<PrimaryButton>Click Me</PrimaryButton>)
        expect(screen.getByText(/click me/i)).toBeInTheDocument()
    })

    it('applies disabled styles when disabled', () => {
        render(<PrimaryButton disabled>Disabled</PrimaryButton>)
        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
        expect(button).toHaveClass('bg-gray-400')
    })

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn()
        render(<PrimaryButton onClick={handleClick}>Click</PrimaryButton>)
        fireEvent.click(screen.getByRole('button'))
        expect(handleClick).toHaveBeenCalled()
    })

    it('does not call onClick when disabled', () => {
        const handleClick = vi.fn()
        render(
            <PrimaryButton onClick={handleClick} disabled>
                Do not click
            </PrimaryButton>
        )
        fireEvent.click(screen.getByRole('button'))
        expect(handleClick).not.toHaveBeenCalled()
    })
})
