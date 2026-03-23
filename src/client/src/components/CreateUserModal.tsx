import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import {
    CreateUserDocument,
    GetUsersDocument,
} from '@/gql/graphql'

interface Props {
    onClose: () => void
}

export function CreateUserModal({ onClose }: Props) {
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [fieldError, setFieldError] = useState('')

    const [createUser, { loading, error }] = useMutation(CreateUserDocument, {
        // Manually update the GET_USERS cache so the new user
        // appears in the list without a refetch round-trip.
        update(cache, { data }) {
            const newUser = data?.createUser
            if (!newUser) return

            // Read the current cached list
            const existing = cache.readQuery({
                query: GetUsersDocument,
                variables: { page: 1, limit: 20 },
            })

            if (!existing) return

            // Write back with the new user prepended
            cache.writeQuery({
                query: GetUsersDocument,
                variables: { page: 1, limit: 20 },
                data: {
                    users: {
                        ...existing.users,
                        nodes: [newUser, ...existing.users.nodes],
                        totalCount: existing.users.totalCount + 1,
                    },
                },
            })
        },

        onCompleted() {
            onClose()
        },

        onError(err) {
            // GraphQL field errors surface here — e.g. email already taken
            console.error('Create failed:', err.message)
        },
    })

    function handleSubmit() {
        if (!form.name || !form.email || !form.password) {
            setFieldError('All fields are required.')
            return
        }
        setFieldError('')
        createUser({ variables: { input: form } })
    }

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-medium mb-4">New user</h2>

                <div className="flex flex-col gap-3">
                    {[
                        { key: 'name', label: 'Name', type: 'text' },
                        { key: 'email', label: 'Email', type: 'email' },
                        { key: 'password', label: 'Password', type: 'password' },
                    ].map(({ key, label, type }) => (
                        <div key={key}>
                            <label className="text-sm text-gray-600">{label}</label>
                            <input
                                type={type}
                                value={form[key as keyof typeof form]}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, [key]: e.target.value }))
                                }
                                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>
                    ))}
                </div>

                {(fieldError || error) && (
                    <p className="text-sm text-red-600 mt-3">
                        {fieldError || error?.message}
                    </p>
                )}

                <div className="flex justify-end gap-2 mt-5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                </div>
            </div>
        </div>
    )
}
