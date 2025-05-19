'use client'

import PrimaryButton from './PrimaryButton'


type UpdateFiltersProps = {
    filter: string
    startDate: string
    endDate: string
    onFilterChange: (value: string) => void
    onStartDateChange: (value: string) => void
    onEndDateChange: (value: string) => void
    onClear: () => void
}

export default function UpdateFilters({
    filter,
    startDate,
    endDate,
    onFilterChange,
    onStartDateChange,
    onEndDateChange,
    onClear,
}: UpdateFiltersProps) {
    return (
        <>
            <div className="flex items-center justify-between gap-2 w-full mb-2">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => onFilterChange(e.target.value)}
                        placeholder="Search update..."
                        className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🔍</span>
                </div>

                {(startDate || endDate || filter) && (
                    <PrimaryButton onClick={onClear} className="text-sm px-4 py-2 shadow-sm"> Clear Filters </PrimaryButton>
                )}
            </div>

            <div className="flex gap-2 mb-4">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    className="flex-1 border px-3 py-2 rounded text-sm bg-[var(--background)] text-[var(--foreground)]"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                    className="flex-1 border px-3 py-2 rounded text-sm bg-[var(--background)] text-[var(--foreground)]"
                />
            </div>
        </>
    )
}
