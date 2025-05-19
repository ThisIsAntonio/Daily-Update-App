'use client'

import WordFrequencyChart from './WordFrequencyChart'

type TopWordsPanelProps = {
    topWords: [string, number][]
}

const COLORS = ['#3182ce', '#63b3ed', '#90cdf4', '#bee3f8', '#ebf8ff']

export default function TopWordsPanel({ topWords }: TopWordsPanelProps) {
    const chartData = topWords.map(([word, count]) => ({
        name: word,
        value: count
    }))

    return (
        <div className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">Top 5 Words</h2>

            <ol className="list-decimal ml-4 text-sm space-y-1 mb-6">
                {topWords.map(([word, count]) => (
                    <li key={word}>
                        <span className="text-[var(--foreground)]">{word}</span>{' '}
                        <span className="text-gray-500">({count})</span>
                    </li>
                ))}
            </ol>

            <div className="flex justify-center items-center">
                <div className="w-[320px] h-[240px] mx-auto text-[var(--foreground)]">
                    <WordFrequencyChart data={topWords} type="pie" height={240}/>
                </div>
            </div>
        </div>
    )
}
