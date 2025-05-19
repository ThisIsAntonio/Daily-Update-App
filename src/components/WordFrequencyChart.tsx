'use client'

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts'

type Props = {
    data: [string, number][]
    type?: 'bar' | 'pie'
    height?: number
}

const COLORS = ['#3182ce', '#63b3ed', '#90cdf4', '#bee3f8', '#ebf8ff']

export default function WordFrequencyChart({ data, type = 'bar', height = 140 }: Props) {
    const chartData = data.map(([word, count]) => ({ word, count }))

    if (type === 'pie') {
        return (
            <ResponsiveContainer width="100%" height={height}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="count"
                        nameKey="word"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        labelLine={false}
                        fill="#8884d8"
                    >
                        {chartData.map((_, idx) => (
                            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        )
    }

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart
                data={chartData}
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
    )
}
