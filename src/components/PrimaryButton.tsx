type PrimaryButtonProps = {
    onClick: () => void
    children: React.ReactNode
    className?: string
}

export default function PrimaryButton({ onClick, children, className = '' }: PrimaryButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`bg-gradient-to-r from-blue-700 to-blue-400 text-white font-medium px-4 py-2 rounded hover:brightness-110 transition ${className}`}
        >
            {children}
        </button>
    )
}
