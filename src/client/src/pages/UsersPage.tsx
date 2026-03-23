import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { getFragmentData } from '@/gql/fragment-masking'
import { GetUsersDocument, UserFieldsFragmentDoc } from '@/gql/graphql'
import { UserCard } from '@/components/UserCard'
import { CreateUserModal } from '@/components/CreateUserModal'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorMessage } from '@/components/ui/ErrorMessage'

export function UsersPage() {
    const [showModal, setShowModal] = useState(false)

    const { data, loading, error, refetch } = useQuery(GetUsersDocument, {
        variables: { page: 1, limit: 20 },
        // notifyOnNetworkStatusChange lets loading flip true on refetch too
        notifyOnNetworkStatusChange: true,
    })

    // loading is true only on the very first fetch (no cache yet)
    if (loading && !data) return <LoadingSpinner message="Loading users..." />

    // error still shows stale data if cache-and-network returned something
    if (error && !data) {
        return <ErrorMessage error={error} retry={() => refetch()} />
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-medium">Users</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {data?.users.totalCount ?? 0} total
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                    + New user
                </button>
            </div>

            {/* Subtle refetch indicator — doesn't replace content */}
            {loading && data && (
                <p className="text-xs text-gray-400 mb-3">Refreshing...</p>
            )}

            {/* Partial error alongside stale data */}
            {error && data && (
                <ErrorMessage error={error} retry={() => refetch()} />
            )}

            {/* User grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data?.users.nodes.map((masked) => {
                    const user = getFragmentData(UserFieldsFragmentDoc, masked)
                    return <UserCard key={user.id} user={user} />
                })}
            </div>

            {showModal && (
                <CreateUserModal onClose={() => setShowModal(false)} />
            )}
        </div>
    )
}