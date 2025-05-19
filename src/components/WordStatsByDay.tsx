'use client'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import WordFrequencyChart from './WordFrequencyChart'

type Props = {
    selectedDay: Date
    onDayChange: (date: Date) => void
    wordsPerDay: Record<string, number>
    topWordsForDay: [string, number][]
}

function formatDateKey(date: Date): string {
    return date.toISOString().slice(0, 10)
}

export default function WordStatsByDay({
    selectedDay,
    onDayChange,
    wordsPerDay,
    topWordsForDay
}: Props) {
    return (
        <div className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 animate-fade-in">
            <h2 className="font-semibold mb-2">Words by Day</h2>

            {/* Calendar selector */}
            <div className="flex justify-center mb-7">
                <Calendar
                    onChange={(date) => onDayChange(date as Date)}
                    value={selectedDay}
                    className="custom-calendar"
                    locale="en-US"
                    tileDisabled={({ date }) => !wordsPerDay[formatDateKey(date)]}
                />
            </div>

            {/* Daily stats */}
            <p className="text-sm mb-2">
                {selectedDay.toLocaleDateString()}: {wordsPerDay[formatDateKey(selectedDay)] ?? 0} words
            </p>

            {topWordsForDay.length > 0 ? (
                <ol className="list-decimal text-sm ml-4 mb-4">
                    {topWordsForDay.map(([word, count]) => (
                        <li key={word}>{word} ({count})</li>
                    ))}
                </ol>
            ) : (
                <p className="text-sm text-gray-500 italic">No data available</p>
            )}

            <WordFrequencyChart data={topWordsForDay} type="bar" />

        </div>
    )
}
