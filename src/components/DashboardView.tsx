'use client'

import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell
} from 'recharts'
import { useAuth } from '@/context/AuthContext'

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
  const [updates, setUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(true)
  const [totalUpdates, setTotalUpdates] = useState(0)
  const [updatesPerDay, setUpdatesPerDay] = useState<Record<string, number>>({})
  const [topWords, setTopWords] = useState<[string, number][]>([])
  const [wordsPerDay, setWordsPerDay] = useState<Record<string, number>>({})
  const [maxWordDay, setMaxWordDay] = useState<string | null>(null)
  const [today, setToday] = useState('')
  const { userId } = useAuth()
  const [filter, setFilter] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('')
  const [refreshFlag, setRefreshFlag] = useState(false);


  useEffect(() => {
    const date = new Date().toLocaleDateString()
    setToday(date)
  }, [])

  useEffect(() => {
    const fetchUpdates = async (): Promise<void> => {
      if (!userId) return
      try {
        const res = await fetch(`/api/updates?userId=${userId}`)
        const data: unknown = await res.json()

        if (
          Array.isArray(data) &&
          data.every(
            (item): item is Update =>
              typeof item === 'object' &&
              item !== null &&
              'id' in item &&
              'content' in item &&
              'createdAt' in item
          )
        ) {
          let filtered = data;

          if (startDate && endDate) {
            const start = new Date(startDate).toDateString();
            const end = new Date(endDate).toDateString();

            filtered = data.filter((u) => {
              const created = new Date(u.createdAt).toDateString();
              return created >= start && created <= end;            
            });
          }

          setUpdates(filtered);
          setTotalUpdates(filtered.length);


          const grouped: Record<string, number> = {}

          filtered.forEach((u: Update) => {
            const day = new Date(u.createdAt).toLocaleDateString()
            grouped[day] = (grouped[day] ?? 0) + 1
          })

          setUpdatesPerDay(grouped)

          // Counting words per day and frequency
          const wordsPerDayCount: Record<string, number> = {}
          const wordFrequency: Record<string, number> = {}

          filtered.forEach((u) => {
            const day = new Date(u.createdAt).toLocaleDateString()
            const words = u.content
              .toLowerCase()
              .replace(/[^\w\s]/g, '') // remove punctuation
              .split(/\s+/)
              .filter(Boolean)

            // Amount of words per day
            wordsPerDayCount[day] = (wordsPerDayCount[day] ?? 0) + words.length
            // Count frequency of each word
            words.forEach((word) => {
              wordFrequency[word] = (wordFrequency[word] ?? 0) + 1
            })
          })
          setWordsPerDay(wordsPerDayCount)
          // Top 5 words
          const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1])
          setTopWords(sortedWords.slice(0, 5))
          // Top 5 words per day
          const maxDay = Object.entries(wordsPerDayCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null
          setMaxWordDay(maxDay)
        } else {
          console.error('Unexpected data format:', data)
        }
      } catch (error) {
        console.error('Failed to load updates:', error)
      } finally {
        setLoading(false)
      }
    }

    void fetchUpdates();
  }, [refresh, refreshFlag])

  const updatesBarData = Object.entries(updatesPerDay).map(([day, count]) => ({
    day,
    count,
  }))

  const applyDateFilter = () => {
    setRefreshFlag(!refreshFlag); // Triggers fetchUpdates again
  };

  return (
    <main className="min-h-screen p-6 bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Column 1 : Updates list */}
        <div className="md:col-span-2 relative flex min-h-[520px]">
          {/* Animated background border */}
          <div className="absolute -inset-[2px] z-0 rounded-lg overflow-hidden pointer-events-none">
            <div className="absolute inset-0 animate-border-loop bg-[conic-gradient(at_top_left,_#60a5fa,_#3b82f6,_#2563eb,_#60a5fa)] bg-[length:400%_400%] blur-md opacity-70" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex-grow bg-[var(--background)] text-[var(--foreground)] p-6 rounded-lg shadow border border-gray-300 dark:border-gray-600 w-full flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Your Updates</h1>
            <div className="grid grid-cols-4 gap-2 items-center mb-4">
  {/* Search input */}
  <div className="relative col-span-1">
    <input
      type="text"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search updates..."
      className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
    />
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      🔍
    </span>
  </div>

  {/* Start date */}
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className="col-span-1 border px-3 py-2 rounded text-sm bg-[var(--background)] text-[var(--foreground)]"
    />

  {/* End date */}
  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    className="col-span-1 border px-3 py-2 rounded text-sm bg-[var(--background)] text-[var(--foreground)]"
    />

  {/* Filter button */}
  <button
    onClick={applyDateFilter}
    className="col-span-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
  >
    Filter
  </button>
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
              <ul className="flex flex-col gap-4 flex-grow">
                {updates
                  .filter((u) => {
                    const matchesText = u.content.toLowerCase().includes(filter.toLowerCase());
                    const matchesDate = filterDate
                      ? new Date(u.createdAt).toISOString().slice(0, 10) === filterDate
                      : true;

                    return matchesText && matchesDate;
                  })
                  .map((update) => (
                    <li
                      key={update.id}
                      className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 bg-[var(--background)] text-[var(--foreground)] animate-fade-in"
                    >
                      <p className="text-base leading-relaxed">
                        {update.content}
                      </p>
                      <small className="text-sm text-gray-500 block mt-2">
                        {new Date(update.createdAt).toLocaleString()}
                      </small>
                    </li>
                  ))}

              </ul>
            )}
          </div>
        </div>
        {/* Column 2: Widgets */}
        <div className="space-y-4">
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
            <h2 className="font-semibold mb-2">Updates per Day</h2>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={updatesBarData}>
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
                <Bar dataKey="count" fill="#3182ce" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 animate-fade-in">
            <h2 className="font-semibold mb-2">Words per Day</h2>
            <ul className="text-sm list-disc ml-4">
              {Object.entries(wordsPerDay).map(([day, count]) => (
                <li key={day}>{day}: {count} words</li>
              ))}
            </ul>
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
              <ResponsiveContainer width={300} height={240}>
                <PieChart>
                  <Pie
                    data={topWords.map(([word, count]) => ({ name: word, value: count }))}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    fill="#8884d8"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={false}
                  >
                    {topWords.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div >
    </main >
  )
} 