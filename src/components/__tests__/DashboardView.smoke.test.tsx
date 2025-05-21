import { describe, it, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import DashboardView from '../DashboardView'
import { AuthContext } from '@/context/AuthContext'
import React from 'react'

const mockUserId = 'testuser'
const mockLogout = vi.fn()

beforeEach(() => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ updates: [] }),
        })
    ) as unknown as typeof fetch
})

describe('DashboardView', () => {
    it('renders without crashing', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{ userId: mockUserId, login: vi.fn(), logout: mockLogout }}>
                    <DashboardView refresh={false} onAddClick={() => { }} />
                </AuthContext.Provider>
            )
        })

        expect(screen.getByText(/Your Updates/i)).toBeInTheDocument()
    })
})
