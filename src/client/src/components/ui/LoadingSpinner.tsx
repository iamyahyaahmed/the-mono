interface Props { message?: string }

export function LoadingSpinner({ message = 'Loading...' }: Props) {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-t-blue-500 animate-spin" />
            <p className="text-sm text-gray-500">{message}</p>
        </div>
    )
}