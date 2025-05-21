import { describe, it, vi, expect, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Dashboard from '../DashboardView'
import { AuthContext } from '@/context/AuthContext'
import React from 'react'

const mockUserId = 'testuser'
const mockLogout = vi.fn()

const mockUpdates = [
    {
        id: '1',
        content: 'Finished testing the dashboard',
        createdAt: '2024-05-16T12:00:00.000Z',
    },
    {
        id: '2',
        content: 'Worked on date filters',
        createdAt: '2024-05-17T09:30:00.000Z',
    },
]

beforeEach(() => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ updates: mockUpdates }),
        })
    ) as unknown as typeof fetch
})

describe('DashboardView', () => {
    it('renders updates from API correctly', async () => {
        render(
            <AuthContext.Provider value={{ userId: mockUserId, login: vi.fn(), logout: mockLogout }}>
                <Dashboard refresh={false} onAddClick={() => { }} />
            </AuthContext.Provider>
        )

        await waitFor(() => {
            expect(screen.getByText(/Finished testing the dashboard/i)).toBeInTheDocument()
            expect(screen.getByText(/Worked on date filters/i)).toBeInTheDocument()
        })
    })

    it('filters updates by search input', async () => {
        render(
            <AuthContext.Provider value={{ userId: mockUserId, login: vi.fn(), logout: mockLogout }}>
                <Dashboard refresh={false} onAddClick={() => { }} />
            </AuthContext.Provider>
        )

        await waitFor(() => {
            expect(screen.getByText(/Worked on date filters/i)).toBeInTheDocument()
        })

        fireEvent.change(screen.getByPlaceholderText(/Search update/i), {
            target: { value: 'testing' },
        })

        await waitFor(() => {
            expect(screen.queryByText(/Worked on date filters/i)).not.toBeInTheDocument()
            expect(screen.getByText(/Finished testing the dashboard/i)).toBeInTheDocument()
        })
    })
})
