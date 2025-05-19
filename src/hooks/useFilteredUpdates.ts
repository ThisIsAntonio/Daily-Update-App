import { useMemo } from "react";
import type { Update } from "@/types/Update";
export function useFilteredUpdates(
    updates: Update[],
    filter: string,
    startDate: string,
    endDate: string
) {
    return useMemo(() => {
        let filtered = updates;

        if (startDate && endDate) {
            filtered = filtered.filter((u) => {
                const dateStr = u.createdAt.slice(0, 10);
                return dateStr >= startDate && dateStr <= endDate;
            });
        }

        if (filter) {
            filtered = filtered.filter((u) =>
                u.content.toLowerCase().includes(filter.toLowerCase())
            );
        }

        return filtered;
    }, [updates, filter, startDate, endDate]);
}
