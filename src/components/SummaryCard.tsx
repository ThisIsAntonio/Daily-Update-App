'use client'

type Props = {
    today: string
    total: number
}

export default function SummaryCard({ today, total }: Props) {
    return (
        <div className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-700 
            rounded-lg p-4 shadow-md hover:shadow-lg hover:border-blue-400 dark:hover:border-purple-500 
            transition-all duration-300 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none blur-xl opacity-40 bg-blue-100 dark:bg-blue-500" />
            <div className="relative z-10">
                <p className="font-medium"><strong>Today:</strong> {today}</p>
                <p className="font-medium"><strong>Total updates:</strong> {total}</p>
            </div>
        </div>
    )
}
