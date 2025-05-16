import { useEffect, useState } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid, 
    PieChart,
    Pie,
    Cell } from 'recharts'

type Update = {
    id: string
    content: string
    createdAt: string
}

type Props = {
    refresh: boolean,
    onAddClick: () => void
}

const COLORS = ['#3182ce', '#63b3ed', '#90cdf4', '#bee3f8', '#ebf8ff']

export default function Dashboard({refresh, onAddClick}: Props) {
    const [updates, setUpdates] = useState<Update[]>([])
    const [loading, setLoading] = useState(true)
    const [totalUpdates, setTotalUpdates] = useState(0)
    const [updatesPerDay, setUpdatesPerDay] = useState<Record<string, number>>({})
    const [topWords, setTopWords] = useState<[string, number][]>([])
    const [wordsPerDay, setWordsPerDay] = useState<Record<string, number>>({})
    const [maxWordDay, setMaxWordDay] = useState<string | null>(null)
    const [today, setToday] = useState<string>('')

    useEffect(() => {
        const date = new Date().toLocaleDateString()
        setToday(date)
    }, [])

    useEffect(() => {
        const fetchUpdates = async (): Promise<void> => {
            try {
                const res = await fetch('/api/updates')
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
                    setUpdates(data)
                    setTotalUpdates(data.length)

                    const grouped: Record<string, number> = {}

                    data.forEach((u: Update) => {
                        const day = new Date(u.createdAt).toLocaleDateString()
                        grouped[day] = (grouped[day] ?? 0) + 1
                    })

                    setUpdatesPerDay(grouped)

                    // Counting words per day and frequency
                    const wordsPerDayCount: Record<string, number> = {}
                    const wordFrequency: Record<string, number> = {}

                    data.forEach((u) => {
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
    }, [refresh])

    const updatesBarData = Object.entries(updatesPerDay).map(([day, count]) => ({
        day,
        count,
    }))
    
    return (

        <main className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-foreground dark:text-white transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Column 1 : Updates list*/}
                    <div className="md:col-span-2 bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded shadow">
                        <h1 className="text-2xl font-bold mb-4">Your Updates</h1>
                        {loading ? (
                            <div className="space-y-4">
                                {Array.from({ length: 3 }).map((_, idx) => (
                                    <div
                                    key={idx}
                                    className="animate-pulse space-y-2 p-4 border rounded bg-white dark:bg-gray-800 shadow transition-colors text-black dark:text-white border-gray-200 dark:border-gray-700"
                                    >
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        ) : updates.length === 0 ? (
                            <div className="text-center text-gray-500 italic">
                                No updates yet. Click{' '}
                                <button
                                    onClick={onAddClick}
                                    className="text-blue-600 underline font-medium hover:text-blue-800 transition"
                                >
                                    + Add Update
                                </button>
                                to get started!
                            </div>

                        ) : (
                        <ul className="space-y-4">
                            {updates.map((update) => (
                            <li key={update.id} className="border p-4 rounded transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg">
                                <p>{update.content}</p>
                                <small className="text-gray-500">
                                {new Date(update.createdAt).toLocaleString()}
                                </small>
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>

                    {/* Column 2: Widgets */}
                    <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-gray-800 text-foreground dark:text-white border border-blue-200 rounded p-4 shadow transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg">
                            <p><strong>Today:</strong> {today}</p>
                            <p><strong>Total updates:</strong> {totalUpdates}</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 text-foreground dark:text-white border border-gray-200 dark:border-gray-700 rounded p-4 shadow transition-colors transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg">
                            <h2 className="font-semibold mb-2">Updates per Day</h2>
                            <ResponsiveContainer width="100%" height={150}>
                                <BarChart data={updatesBarData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3182ce" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white dark:bg-gray-800 text-foreground dark:text-white border border-gray-200 dark:border-gray-700 rounded p-4 shadow transition-colors transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg">
                        <h2 className="font-semibold mb-2">Words per Day</h2>
                        <ul className="text-sm list-disc ml-4">
                            {Object.entries(wordsPerDay).map(([day, count]) => (
                            <li key={day}>{day}: {count} words</li>
                            ))}
                        </ul>
                        </div>

                        {maxWordDay && (
                        <div className="bg-white dark:bg-gray-800 text-foreground dark:text-white border border-gray-200 dark:border-gray-700 rounded p-4 shadow transition-colors transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg">
                            <p><strong>Most words written on:</strong></p>
                            <p className="mt-1">{maxWordDay} ({wordsPerDay[maxWordDay]} words)</p>
                        </div>
                        )}

                        <div className="bg-white dark:bg-gray-800 text-foreground dark:text-white border border-gray-200 dark:border-gray-700 rounded p-4 shadow transition-colors transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg">
                            <h2 className="font-semibold mb-4">Top 5 Words</h2>
                            <div className="col-span-2"></div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                    {/* List */}
                                    <ol className="list-decimal ml-4 text-sm">
                                    {topWords.map(([word, count]) => (
                                        <li key={word}>
                                        {word} ({count})
                                        </li>
                                    ))}
                                    </ol>
                                </div>

                                {/* Pie chart */}
                                <div className="col-span-3">
                                    <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                        data={topWords.map(([word, count]) => ({ name: word, value: count }))}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={60}
                                        fill = "#8884d8"
                                        label = {({ name, value }) => `${name}: ${value}`}
                                        >
                                        {topWords.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                        </Pie>
                                    </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
        </main>
    )
}
