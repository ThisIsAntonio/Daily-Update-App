'use client'

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

type Props = {
    data: { day: string; count: number }[]
}

export default function UpdatesPerDayChart({ data }: Props) {
    return (
        <div className="bg-[var(--background)] text-[var(--foreground)] border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 animate-fade-in">
            <h2 className="font-semibold mb-2">Updates per Day</h2>
            <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={data}>
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
                    <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#3b82f6"
                        fill="url(#areaColor)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
