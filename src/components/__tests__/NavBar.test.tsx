import { describe, it, vi, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NavBar from '../NavBar'
import { AuthContext } from '@/context/AuthContext'
import useDarkMode from '@/hooks/useDarkMode'

// Mock del hook useDarkMode
vi.mock('@/hooks/useDarkMode', () => ({
    default: () => [false, vi.fn(), true],
}))

describe('NavBar', () => {
    const mockLogout = vi.fn()
    const mockUserId = 'Marcos'
    const mockLogin = vi.fn()

    const renderWithContext = () => {
        return render(
            <AuthContext.Provider value={{ userId: mockUserId, login: mockLogin, logout: mockLogout }}>
                <NavBar />
            </AuthContext.Provider>
        )
    }

    it('renders the user name', () => {
        renderWithContext()
        expect(screen.getByText(/Hello Marcos/i)).toBeInTheDocument()
    })

    it('renders the app title', () => {
        renderWithContext()
        expect(screen.getByText(/Daily Update App/i)).toBeInTheDocument()
    })

    it('calls logout when button is clicked', () => {
        renderWithContext()
        const button = screen.getByRole('button', { name: /Log out/i })
        fireEvent.click(button)
        expect(mockLogout).toHaveBeenCalled()
    })

    it('renders the theme switch', () => {
        renderWithContext()
        expect(screen.getByText('🌞')).toBeInTheDocument()
        expect(screen.getByText('🌙')).toBeInTheDocument()
    })
})
