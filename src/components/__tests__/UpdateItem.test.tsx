import { render, screen } from '@testing-library/react'
import UpdateItem from '../UpdateItem'

describe('UpdateItem', () => {
    it('renders update content and date', () => {
        render(<UpdateItem content="Testing Update" createdAt="2024-05-20" />)

        expect(screen.getByText(/Testing Update/i)).toBeInTheDocument()
        expect(screen.getByText(/2024-05-20/i)).toBeInTheDocument()
    })
})
