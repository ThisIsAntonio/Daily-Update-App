// src/components/UpdateItem.tsx
'use Client'

type Props = {
    content: string
    createdAt: string
}

export default function UpdateItem({ content, createdAt }: Props) {
    return (
        <li
            className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 bg-[var(--background)] text-[var(--foreground)] animate-fade-in"
        >
            <p className="text-base leading-relaxed">{content}</p>
            <small className="text-sm text-gray-500 block mt-2">
                {createdAt}
            </small>
        </li>
    )
}
