'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import 'react-calendar/dist/Calendar.css'
import UpdatesList from './UpdatesList'
import UpdateFilters from './UpdateFilters'
import SummaryCard from './SummaryCard'
import WordStatsByDay from './WordStatsByDay'
import UpdatesPerDayChart from './UpdatesPerDayChart'
import TopWordsPanel from './TopWordsPanel'
import MostVerboseDay from './MostVerboseDay'
import { useFilteredUpdates } from '@/hooks/useFilteredUpdates'
import { useUpdateStats } from '@/hooks/useUpdateStats'
import { useTopWordsForDay } from '@/hooks/useTopWordsForDay'
import type { Update } from '@/types/Update'

// Types

type Props = {
  refresh: boolean
  onAddClick: () => void
}

// Component
export default function Dashboard({ refresh, onAddClick }: Props) {
  const { userId } = useAuth()

  const [allUpdates, setAllUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date>(new Date())
  const [today, setToday] = useState('')

  const [filter, setFilter] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const { updatesPerDay, wordsPerDay, topWords, maxWordDay } = useUpdateStats(allUpdates)
  const topWordsForDay = useTopWordsForDay(allUpdates, selectedDay)

  useEffect(() => {
    setToday(new Date().toLocaleDateString())
  }, [])

  useEffect(() => {
    if (!userId) return
    const fetchAll = async () => {
      try {
        setLoading(true)
        const query = new URLSearchParams({ userId, full: 'true' })
        const res = await fetch(`/api/updates?${query.toString()}`)
        const { updates: all } = await res.json()
        if (Array.isArray(all)) {
          setAllUpdates(all)
        }
      } catch (err) {
        console.error('❌ Error loading updates:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [userId, refresh])

  const filteredUpdates = useFilteredUpdates(allUpdates, filter, startDate, endDate)

  const updatesBarData = Object.entries(updatesPerDay).map(([day, count]) => ({ day, count }))

  return (
    <main className="flex flex-col min-h-screen p-6 bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto h-[800px]">
        {/* Column 1 : Updates list */}
        <div className="md:col-span-2 relative flex h-[800px] max-h-[800px]">
          {/* Animated background border */}
          <div className="absolute -inset-[2px] z-0 rounded-lg overflow-hidden pointer-events-none">
            <div className="absolute inset-0 animate-border-loop bg-[conic-gradient(at_top_left,_#60a5fa,_#3b82f6,_#2563eb,_#60a5fa)] bg-[length:400%_400%] blur-md opacity-70" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex-grow bg-[var(--background)] text-[var(--foreground)] p-6 rounded-lg shadow border border-gray-300 dark:border-gray-600 w-full flex flex-col overflow-hidden">
            <h1 className="text-2xl font-bold mb-4">Your Updates</h1>
            <UpdateFilters filter={filter} startDate={startDate} endDate={endDate} onFilterChange={setFilter} onStartDateChange={setStartDate}
              onEndDateChange={setEndDate} onClear={() => { setFilter(''); setStartDate(''); setEndDate('') }} />
            <div className="overflow-y-auto scrollbar-hide flex-grow pr-2">
              <UpdatesList updates={filteredUpdates} loading={loading} onAddClick={onAddClick} />
            </div>
          </div>
        </div>
        {/* Column 2*/}
        <div className="h-full flex flex-col">
          <div className="flex-grow space-y-4 flex flex-col justify-between">
            <SummaryCard today={today} total={filteredUpdates.length} />

            <WordStatsByDay
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
              wordsPerDay={wordsPerDay}
              topWordsForDay={topWordsForDay}
            />
          </div>
        </div>
        {/* Colum 3 */}
        <div className="h-full flex flex-col">
          <div className="flex-grow space-y-4 flex flex-col justify-between">
            <UpdatesPerDayChart data={updatesBarData} />
            {maxWordDay && (
              <MostVerboseDay maxWordDay={maxWordDay} wordCount={wordsPerDay[maxWordDay]} />
            )}
            <TopWordsPanel topWords={topWords} />
          </div>
        </div>
      </div >
    </main >
  )
} 