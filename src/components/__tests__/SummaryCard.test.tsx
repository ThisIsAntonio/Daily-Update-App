// src/components/__tests__/SummaryCard.test.tsx
import { render, screen } from '@testing-library/react'
import SummaryCard from '../SummaryCard'

describe('SummaryCard', () => {
    it('renders the correct today date and total updates', () => {
        render(<SummaryCard today="2025-05-20" total={42} />)

        expect(screen.getByText(/Today:/i)).toBeInTheDocument()
        expect(screen.getByText(/2025-05-20/i)).toBeInTheDocument()

        expect(screen.getByText(/Total updates:/i)).toBeInTheDocument()
        expect(screen.getByText(/42/i)).toBeInTheDocument()
    })
})
