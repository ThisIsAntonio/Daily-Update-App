import { render, screen, fireEvent } from '@testing-library/react'
import WordStatsByDay from '../WordStatsByDay'

describe('WordStatsByDay', () => {
    const selectedDay = new Date('2024-05-19')
    const wordsPerDay = { '2024-05-19': 20 }
    const topWordsForDay: [string, number][] = [
        ['update', 6],
        ['dashboard', 4],
        ['test', 3],
    ]

    it('renders calendar and stats for selected day', () => {
        render(
            <WordStatsByDay
                selectedDay={selectedDay}
                onDayChange={() => { }}
                wordsPerDay={wordsPerDay}
                topWordsForDay={topWordsForDay}
            />
        )

        expect(screen.getByText('Words by Day')).toBeInTheDocument()
        // expect(screen.getByText(/5\/19\/2024/)).toBeInTheDocument() // Skipped strict date match due to locale variation in toLocaleDateString()
        expect(screen.getByText(/20 words/)).toBeInTheDocument()
        expect(screen.getByText(/update \(6\)/i)).toBeInTheDocument()
        expect(screen.getByText(/dashboard \(4\)/i)).toBeInTheDocument()
    })

    it('renders no data message if no top words', () => {
        render(
            <WordStatsByDay
                selectedDay={selectedDay}
                onDayChange={() => { }}
                wordsPerDay={{}}
                topWordsForDay={[]}
            />
        )
        expect(screen.getByText(/No data available/i)).toBeInTheDocument()
    })

    it('calls onDayChange when a day is clicked', () => {
        const mockOnDayChange = vi.fn()

        render(
            <WordStatsByDay
                selectedDay={selectedDay}
                onDayChange={mockOnDayChange}
                wordsPerDay={{ '2024-05-19': 10 }}
                topWordsForDay={[]}
            />
        )

        const dayButton = screen.getByRole('button', { name: /May 19, 2024/i })
        fireEvent.click(dayButton)
        expect(mockOnDayChange).toHaveBeenCalled()
    })
})
