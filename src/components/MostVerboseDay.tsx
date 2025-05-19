'use client'

type MostVerboseDayProps = {
    maxWordDay: string
    wordCount: number
}

export default function MostVerboseDay({ maxWordDay, wordCount }: MostVerboseDayProps) {
    return (
        <div className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 animate-fade-in">
            <p><strong>Most words written on:</strong></p>
            <p className="mt-1">{maxWordDay} ({wordCount} words)</p>
        </div>
    )
}
