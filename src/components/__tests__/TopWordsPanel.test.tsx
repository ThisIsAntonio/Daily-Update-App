import { render, screen } from '@testing-library/react'
import TopWordsPanel from '../TopWordsPanel'

describe('TopWordsPanel', () => {
    const mockTopWords: [string, number][] = [
        ['test', 10],
        ['daily', 8],
        ['update', 6],
        ['app', 5],
        ['log', 4],
    ]

    it('renders the top words and their counts', () => {
        render(<TopWordsPanel topWords={mockTopWords} />)

        expect(screen.getByText('Top 5 Words')).toBeInTheDocument()
        mockTopWords.forEach(([word, count]) => {
            expect(screen.getByText(word)).toBeInTheDocument()
            expect(screen.getByText(`(${count})`)).toBeInTheDocument()
        })
    })

    it('renders the chart wrapper element', () => {
        const { container } = render(<TopWordsPanel topWords={mockTopWords} />)
        expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument()
    })
})
