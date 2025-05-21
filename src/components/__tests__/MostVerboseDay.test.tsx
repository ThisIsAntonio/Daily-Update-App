// src/components/__tests__/MostVerboseDay.test.tsx
import { render, screen } from '@testing-library/react'
import MostVerboseDay from '../MostVerboseDay'

describe('MostVerboseDay', () => {
    it('renders the most verbose day with word count', () => {
        render(<MostVerboseDay maxWordDay="2025-05-18" wordCount={103} />)

        expect(screen.getByText(/Most words written on:/i)).toBeInTheDocument()
        expect(screen.getByText(/2025-05-18 \(103 words\)/)).toBeInTheDocument()
    })
})
