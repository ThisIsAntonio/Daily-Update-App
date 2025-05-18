'use client'

import { useEffect, useState } from 'react'
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell
} from 'recharts'
import { useAuth } from '@/context/AuthContext'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

// Types

type Update = {
  id: string
  content: string
  createdAt: string
}

type Props = {
  refresh: boolean
  onAddClick: () => void
}

const COLORS = ['#3182ce', '#63b3ed', '#90cdf4', '#bee3f8', '#ebf8ff']

export default function Dashboard({ refresh, onAddClick }: Props) {
  const { userId } = useAuth()

  const [allUpdates, setAllUpdates] = useState<Update[]>([])
  const [updates, setUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(false)
  const [totalUpdates, setTotalUpdates] = useState(0)
  const [updatesPerDay, setUpdatesPerDay] = useState<Record<string, number>>({})
  const [topWords, setTopWords] = useState<[string, number][]>([])
  const [wordsPerDay, setWordsPerDay] = useState<Record<string, number>>({})
  const [maxWordDay, setMaxWordDay] = useState<string | null>(null)
  const [topWordsForDay, setTopWordsForDay] = useState<[string, number][]>([])
  const [selectedDay, setSelectedDay] = useState<Date>(new Date())
  const [today, setToday] = useState('')

  const [filter, setFilter] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

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

  useEffect(() => {
    let filtered = allUpdates

    if (startDate && endDate) {
      filtered = filtered.filter((u) => {
        const dateStr = u.createdAt.slice(0, 10) // solo 'yyyy-mm-dd'
        return dateStr >= startDate && dateStr <= endDate
      })
    }

    if (filter) {
      filtered = filtered.filter((u) =>
        u.content.toLowerCase().includes(filter.toLowerCase())
      )
    }

    setUpdates(filtered)
    setTotalUpdates(filtered.length)
  }, [startDate, endDate, filter, allUpdates])


  useEffect(() => {
    const grouped: Record<string, number> = {}
    const wordsPerDayCount: Record<string, number> = {}
    const wordFrequency: Record<string, number> = {}

    allUpdates.forEach((u) => {
      const day = formatDateKey(new Date(u.createdAt))
      grouped[day] = (grouped[day] ?? 0) + 1

      const words = u.content.toLowerCase().replace(/[^À-ſa-zA-Z0-9\s]/g, '').split(/\s+/).filter(Boolean)
      wordsPerDayCount[day] = (wordsPerDayCount[day] ?? 0) + words.length
      words.forEach(word => {
        wordFrequency[word] = (wordFrequency[word] ?? 0) + 1
      })
    })

    setUpdatesPerDay(grouped)
    setWordsPerDay(wordsPerDayCount)
    setTopWords(Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]).slice(0, 5))
    const maxDay = Object.entries(wordsPerDayCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null
    setMaxWordDay(maxDay)
  }, [allUpdates])

  useEffect(() => {
    const updatesForDay = allUpdates.filter(u => formatDateKey(new Date(u.createdAt)) === formatDateKey(selectedDay))
    const freq: Record<string, number> = {}
    updatesForDay.forEach((u) => {
      const words = u.content.toLowerCase().replace(/[^À-ſa-zA-Z0-9\s]/g, '').split(/\s+/).filter(Boolean)
      words.forEach(word => freq[word] = (freq[word] ?? 0) + 1)
    })
    setTopWordsForDay(Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5))
  }, [selectedDay, allUpdates])

  const updatesBarData = Object.entries(updatesPerDay).map(([day, count]) => ({ day, count }))

  function formatDateKey(date: Date): string {
    return date.toISOString().slice(0, 10)
  }

  return (
    <main className="min-h-screen p-6 bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* Column 1 : Updates list */}
        <div className="md:col-span-2 relative flex h-[800px] max-h-[800px]">
          {/* Animated background border */}
          <div className="absolute -inset-[2px] z-0 rounded-lg overflow-hidden pointer-events-none">
            <div className="absolute inset-0 animate-border-loop bg-[conic-gradient(at_top_left,_#60a5fa,_#3b82f6,_#2563eb,_#60a5fa)] bg-[length:400%_400%] blur-md opacity-70" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex-grow bg-[var(--background)] text-[var(--foreground)] p-6 rounded-lg shadow border border-gray-300 dark:border-gray-600 w-full flex flex-col overflow-hidden">
            <h1 className="text-2xl font-bold mb-4">Your Updates</h1>
            <div className="flex items-center justify-between gap-2 w-full mb-2">
              {/* Search input */}
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search update..."
                  className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🔍</span>
              </div>

              {/* Clear filters styled like Add Update */}
              {(startDate || endDate || filter) && (
              <button
                onClick={() => {
                  setStartDate('')
                  setEndDate('')
                  setFilter('')
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded shadow-sm hover:brightness-110 transition text-sm"
              >
                Clear Filters
              </button>
              )}
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1 border px-3 py-2 rounded text-sm bg-[var(--background)] text-[var(--foreground)]"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1 border px-3 py-2 rounded text-sm bg-[var(--background)] text-[var(--foreground)]"
              />
            </div>


            {loading ? (
              <div className="space-y-4 flex-grow">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="animate-pulse space-y-2 p-4 border rounded bg-[var(--background)] shadow"
                  >
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : updates.length === 0 ? (
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
            ) : (
              <ul className="flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
                {updates
                  .map((update) => (
                    <li
                      key={`${update.id}-${update.createdAt}`}
                      className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 bg-[var(--background)] text-[var(--foreground)] animate-fade-in"
                    >
                      <p className="text-base leading-relaxed">
                        {update.content}
                      </p>
                      <small className="text-sm text-gray-500 block mt-2">
                        {formatDateKey(new Date(update.createdAt))}
                      </small>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        {/* Column 2 and 3 : Widgets */}
        <div className="space-y-10">
          <div className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-700 
            rounded-lg p-4 shadow-md hover:shadow-lg hover:border-blue-400 dark:hover:border-purple-500 
            transition-all duration-300 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none blur-xl opacity-40 bg-blue-100 dark:bg-blue-500" />
            {/* Main Content */}
            <div className="relative z-10">
              <p className="font-medium"><strong>Today:</strong> {today}</p>
              <p className="font-medium"><strong>Total updates:</strong> {totalUpdates}</p>
            </div>
          </div>

          <div className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 animate-fade-in">
            <h2 className="font-semibold mb-2">Words by Day</h2>
            {/* Day selector */}
            <div className="flex justify-center mb-7">
              <Calendar
                onChange={(date) => setSelectedDay(date as Date)}
                value={selectedDay}
                className="custom-calendar"
                locale='en-US'
                tileDisabled={({ date }) => {
                  const key = formatDateKey(date)
                  return !wordsPerDay[key]
                }}
              />
            </div>
            {/* Result of the day */}
            {selectedDay && (
              <>
                <p className="text-sm mb-2">
                  {selectedDay.toLocaleDateString()}: {wordsPerDay[formatDateKey(selectedDay)] ?? 0} words
                </p>
                {topWordsForDay.length > 0 ? (
                  <ol className="list-decimal text-sm ml-4">
                    {topWordsForDay.map(([word, count]) => (
                      <li key={word}>{word} ({count})</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-gray-500 italic">No data available</p>
                )}
              </>
            )}
            <ResponsiveContainer width="100%" height={140} className="mt-7">
              <BarChart
                data={topWordsForDay.map(([word, count]) => ({ word, count }))}
                layout="vertical"
                margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="word" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#3182ce" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Colum 3 */}
        <div className="space-y-4">
          <div className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 animate-fade-in">
            <h2 className="font-semibold mb-2">Updates per Day</h2>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={updatesBarData}>
                <defs>
                  <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #3b82f6',
                    borderRadius: '0.375rem',
                    color: '#ffffff',
                  }}
                  labelStyle={{
                    color: '#ffffff',
                  }}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="url(#areaColor)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {maxWordDay && (
            <div className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 animate-fade-in">
              <p><strong>Most words written on:</strong></p>
              <p className="mt-1">{maxWordDay} ({wordsPerDay[maxWordDay]} words)</p>
            </div>
          )}
          <div className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 animate-fade-in">
            <h2 className="text-lg font-semibold mb-4">Top 5 Words</h2>
            {/* List */}
            <ol className="list-decimal ml-4 text-sm space-y-1 mb-6">
              {topWords.map(([word, count]) => (
                <li key={word}>
                  <span className="text-[var(--foreground)]">{word}</span>{' '}
                  <span className="text-gray-500">({count})</span>
                </li>
              ))}
            </ol>
            {/* Chart */}
            <div className="flex justify-center items-center">
              <div className="w-[320px] h-[240px] mx-auto text-[var(--foreground)]">
                <PieChart width={340} height={240}>
                  <Pie
                    data={topWords.map(([word, count]) => ({ name: word, value: count }))}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    /*label={({ name, value }) => `${name}: ${value}`} */
                    labelLine={false}
                  >
                    {topWords.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          </div>
        </div>
      </div >
    </main >
  )
} 