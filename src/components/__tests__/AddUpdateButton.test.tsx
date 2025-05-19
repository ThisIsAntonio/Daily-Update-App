import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AddUpdateButton from '../AddUpdateButton'

describe('AddUpdateButton', () => {
    it('renders with the correct text', () => {
        render(<AddUpdateButton onClick={() => { }} />)
        expect(screen.getByText('+ Add Update')).toBeInTheDocument()
    })

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn()
        render(<AddUpdateButton onClick={handleClick} />)

        fireEvent.click(screen.getByText('+ Add Update'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})
