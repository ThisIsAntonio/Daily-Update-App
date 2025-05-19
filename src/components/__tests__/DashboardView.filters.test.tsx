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
        createdAt: '2024-05-16',
    },
    {
        id: '2',
        content: 'Worked on date filters',
        createdAt: '2024-05-17',
    },
    {
        id: '3',
        content: 'Meeting notes with keyword',
        createdAt: '2024-05-18',
    },
]

screen.debug()

beforeEach(() => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ updates: mockUpdates }),
        })
    ) as any
})

describe('DashboardView filters', () => {
    const renderDashboard = () =>
        render(
            <AuthContext.Provider value={{ userId: mockUserId, login: vi.fn(), logout: mockLogout }}>
                <Dashboard refresh={false} onAddClick={() => { }} />
            </AuthContext.Provider>
        )

    it('filters updates by date range', async () => {
        const { container } = renderDashboard()

        await waitFor(() => screen.getByText(/Finished testing the dashboard/i))

        const dateInputs = container.querySelectorAll('input[type="date"]')
        const [startInput, endInput] = dateInputs as unknown as HTMLInputElement[]

        fireEvent.change(startInput, { target: { value: '2024-05-17' } })
        fireEvent.change(endInput, { target: { value: '2024-05-17' } })

        await waitFor(() => {
            expect(screen.getByText(/Worked on date filters/i)).toBeInTheDocument()
            expect(screen.queryByText(/Finished testing the dashboard/i)).not.toBeInTheDocument()
            expect(screen.queryByText(/Meeting notes with keyword/i)).not.toBeInTheDocument()
        })
    })


    it('combines date and text filters correctly', async () => {
        renderDashboard()

        await waitFor(() => screen.getByText(/Meeting notes with keyword/i))

        fireEvent.change(screen.getByPlaceholderText(/Search update/i), {
            target: { value: 'keyword' },
        })

        const [startInput, endInput] = screen.getAllByDisplayValue('') as HTMLInputElement[]
        fireEvent.change(startInput, { target: { value: '2024-05-18' } })
        fireEvent.change(endInput, { target: { value: '2024-05-18' } })

        await waitFor(() => {
            expect(screen.getByText(/Meeting notes with keyword/i)).toBeInTheDocument()
            expect(screen.queryByText(/Finished testing the dashboard/i)).not.toBeInTheDocument()
        })
    })
})
