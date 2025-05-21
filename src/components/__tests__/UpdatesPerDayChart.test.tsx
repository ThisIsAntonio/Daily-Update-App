import { render, screen } from '@testing-library/react'
import UpdatesPerDayChart from '../UpdatesPerDayChart'
import { vi, describe, it, expect } from 'vitest'

vi.mock('recharts', async () => {
    const original = await vi.importActual<typeof import('recharts')>('recharts')
    return {
        ...original,
        ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
    }
})

const mockData = [
    { day: '2024-05-18', count: 3 },
    { day: '2024-05-19', count: 5 },
    { day: '2024-05-20', count: 2 },
]

describe('UpdatesPerDayChart', () => {
    it('renders without crashing', () => {
        render(<UpdatesPerDayChart data={mockData} />)
    })

    it('renders the title', () => {
        render(<UpdatesPerDayChart data={mockData} />)
        expect(screen.getByText(/updates per day/i)).toBeInTheDocument()
    })
})
