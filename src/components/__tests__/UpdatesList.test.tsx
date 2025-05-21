import { render, screen } from '@testing-library/react'
import UpdatesList from '../UpdatesList'

const updates = [
    { id: '1', content: 'Mock update', createdAt: '2024-05-20' }
]

describe('UpdatesList', () => {
    it('renders updates when not loading', () => {
        render(<UpdatesList updates={updates} loading={false} onAddClick={() => { }} />)
        expect(screen.getByText(/Mock update/i)).toBeInTheDocument()
    })

    it('renders loading placeholders', () => {
        render(<UpdatesList updates={[]} loading={true} onAddClick={() => { }} />)
        expect(screen.getAllByRole('status').length).toBeGreaterThan(0)
    })

    it('renders empty message when no updates', () => {
        render(<UpdatesList updates={[]} loading={false} onAddClick={() => { }} />)
        expect(screen.getByText(/No updates yet/i)).toBeInTheDocument()
    })
})
