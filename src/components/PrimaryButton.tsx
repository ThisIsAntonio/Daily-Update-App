type PrimaryButtonProps = {
    onClick?: () => void
    children: React.ReactNode
    className?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
}

export default function PrimaryButton({
    onClick,
    children,
    className = '',
    type = 'button',
    disabled = false,
}: PrimaryButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                ${disabled 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-700 to-blue-400 hover:brightness-110'}
                text-white font-medium px-4 py-2 rounded transition
                ${className}
            `}
        >
            {children}
        </button>
    )
}
