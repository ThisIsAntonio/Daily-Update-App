import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from '../ThemeToggle'
import * as useDarkModeModule from '@/hooks/useDarkMode'

vi.mock('@/hooks/useDarkMode') // Mock del hook

describe('ThemeToggle', () => {
    it('does not render if not mounted', () => {
        vi.spyOn(useDarkModeModule, 'default').mockReturnValue([false, vi.fn(), false])
        const { container } = render(<ThemeToggle />)
        expect(container.firstChild).toBeNull()
    })

    it('renders and toggles theme', () => {
        const mockSetIsDark = vi.fn()
        vi.spyOn(useDarkModeModule, 'default').mockReturnValue([false, mockSetIsDark, true])

        render(<ThemeToggle />)

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeInTheDocument()

        fireEvent.click(checkbox)
        expect(mockSetIsDark).toHaveBeenCalledWith(true)
    })
})
