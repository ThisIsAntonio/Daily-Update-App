// src/components/SkeletonUpdate.tsx
export default function SkeletonUpdate() {
    return (
        <div className="animate-pulse space-y-2 p-4 border rounded bg-[var(--background)] shadow">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
    )
}
