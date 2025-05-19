// src/hooks/useTopWordsForDay.ts
import { useMemo } from "react";
import { formatDateKey } from "@/utils/date";
import type { Update } from "@/types/Update";

export function useTopWordsForDay(
    updates: Update[],
    selectedDay: Date
): [string, number][] {
    return useMemo(() => {
        const key = formatDateKey(selectedDay);
        const dailyUpdates = updates.filter(
            (u) => formatDateKey(new Date(u.createdAt)) === key
        );

        const freq: Record<string, number> = {};

        for (const u of dailyUpdates) {
            const words = u.content
                .toLowerCase()
                .replace(/[^À-ſa-zA-Z0-9\s]/g, "")
                .split(/\s+/)
                .filter(Boolean);

            for (const word of words) {
                freq[word] = (freq[word] ?? 0) + 1;
            }
        }

        return Object.entries(freq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
    }, [updates, selectedDay]);
}
