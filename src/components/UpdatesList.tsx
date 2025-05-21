'use client'

import UpdateItem from './UpdateItem'
import { Update } from '@/types/Update'

type UpdatesListProps = {
    updates: Update[]
    loading: boolean
    onAddClick: () => void
}

export default function UpdatesList({ updates, loading, onAddClick }: UpdatesListProps) {
    const formatDateKey = (date: Date) => date.toISOString().slice(0, 10)

    if (loading) {
        return (
            <div className="space-y-4 flex-grow">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <div
                        key={idx}
                        role="status"
                        className="animate-pulse space-y-2 p-4 border rounded bg-[var(--background)] shadow"
                    >
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (updates.length === 0) {
        return (
            <div className="text-center text-gray-500 italic flex-grow">
                No updates yet. Click{' '}
                <button
                    onClick={onAddClick}
                    className="text-blue-600 underline font-medium hover:text-blue-800 transition"
                >
                    + Add Update
                </button>{' '}
                to get started!
            </div>
        )
    }

    return (
        <ul className="flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
            {updates.map((u) => (
                <UpdateItem
                    key={`${u.id}-${u.createdAt}`}
                    content={u.content}
                    createdAt={formatDateKey(new Date(u.createdAt))}
                />
            ))}
        </ul>
    )
}
