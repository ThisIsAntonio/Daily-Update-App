import { render, screen, fireEvent } from '@testing-library/react'
import LoginScreen from '../LoginScreen'

describe('LoginScreen', () => {
    const mockLogin = vi.fn()

    it('renders form and disables button by default', () => {
        render(
            <LoginScreen login={mockLogin} isDark={false} setIsDark={() => { }} hasMounted={true} />
        )

        expect(screen.getByPlaceholderText(/e\.g\. marcos123/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /log in/i })).toBeDisabled()
    })

    it('enables button when name is typed', () => {
        render(
            <LoginScreen login={mockLogin} isDark={false} setIsDark={() => { }} hasMounted={true} />
        )

        fireEvent.change(screen.getByPlaceholderText(/e\.g\. marcos123/i), {
            target: { value: 'Marcos' },
        })

        expect(screen.getByRole('button', { name: /log in/i })).toBeEnabled()
    })

    it('calls login with trimmed name on submit', () => {
        render(
            <LoginScreen login={mockLogin} isDark={false} setIsDark={() => { }} hasMounted={true} />
        )

        fireEvent.change(screen.getByPlaceholderText(/e\.g\. marcos123/i), {
            target: { value: '  Marcos  ' },
        })

        fireEvent.submit(screen.getByRole('form')) // optional, or use fireEvent.click(button)

        expect(mockLogin).toHaveBeenCalledWith('Marcos')
    })
})
