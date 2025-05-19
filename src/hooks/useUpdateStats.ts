// src/hooks/useUpdateStats.ts
import { useMemo } from "react";
import { formatDateKey } from "@/utils/date";
import type { Update } from "@/types/Update";

export function useUpdateStats(updates: Update[]) {
    return useMemo(() => {
        const updatesPerDay: Record<string, number> = {};
        const wordsPerDay: Record<string, number> = {};
        const wordFrequency: Record<string, number> = {};

        for (const u of updates) {
            const day = formatDateKey(new Date(u.createdAt));
            updatesPerDay[day] = (updatesPerDay[day] ?? 0) + 1;

            const words = u.content
                .toLowerCase()
                .replace(/[^À-ſa-zA-Z0-9\s]/g, "")
                .split(/\s+/)
                .filter(Boolean);

            wordsPerDay[day] = (wordsPerDay[day] ?? 0) + words.length;

            for (const word of words) {
                wordFrequency[word] = (wordFrequency[word] ?? 0) + 1;
            }
        }

        const topWords = Object.entries(wordFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        const maxWordDay =
            Object.entries(wordsPerDay).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

        return {
            updatesPerDay,
            wordsPerDay,
            topWords,
            maxWordDay,
        };
    }, [updates]);
}
