import { useMutation } from '@apollo/client/react'
import { DeleteUserDocument, type UserFieldsFragment } from '@/gql/graphql'

interface Props {
    user: UserFieldsFragment   // ← codegen'd fragment type, not a hand-written interface
}

export function UserCard({ user }: Props) {
    const [deleteUser, { loading: deleting }] = useMutation(DeleteUserDocument, {
        variables: { id: user.id },

        // update runs after the mutation succeeds.
        // cache.evict removes the User object by its cache key.
        // cache.gc cleans up any dangling references to it.
        update(cache) {
            cache.evict({ id: cache.identify({ __typename: 'User', id: user.id }) })
            cache.gc()
        },

        // Optimistic response makes the card disappear instantly,
        // before the server confirms — rolls back on error.
        optimisticResponse: {
            deleteUser: { __typename: 'User', id: user.id },
        },

        onError(err) {
            console.error('Delete failed:', err.message)
        },
    })

    return (
        <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
            <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400 mt-1">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                </p>
            </div>

            <button
                onClick={() => deleteUser()}
                disabled={deleting}
                className="text-xs text-red-500 hover:text-red-700 disabled:opacity-40"
            >
                {deleting ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    )
}