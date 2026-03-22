import type { ErrorLike } from '@apollo/client'

interface Props {
    error: ErrorLike | Error | unknown
    retry?: () => void
}

function getMessage(error: unknown): string {
    if (error instanceof Error) return error.message
    return 'An unexpected error occurred.'
}

export function ErrorMessage({ error, retry }: Props) {
    return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">
                {getMessage(error)}
            </p>
            {retry && (
                <button
                    onClick={retry}
                    className="mt-2 text-xs text-red-600 underline"
                >
                    Try again
                </button>
            )}
        </div>
    )
}