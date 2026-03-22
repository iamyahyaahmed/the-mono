import {
    ApolloClient,
    CombinedGraphQLErrors,
    InMemoryCache,
    HttpLink,
    from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ErrorLink } from '@apollo/client/link/error'

// ─── 1. HTTP Link ────────────────────────────────────────────────
// Points at /graphql — Vite proxy forwards this to Express in dev.
// In production, set VITE_API_URL to your deployed server URL.
const httpLink = new HttpLink({
    uri: import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/graphql`
        : '/graphql',
})

// ─── 2. Auth Link ────────────────────────────────────────────────
// Reads JWT from localStorage and attaches it as a Bearer token.
// setContext runs before every request — token is always fresh.
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

// ─── 3. Error Link ───────────────────────────────────────────────
// Apollo 4: handler receives `error` (GraphQL vs network via CombinedGraphQLErrors.is)
const errorLink = new ErrorLink(({ error, operation }) => {
    if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, extensions }) => {
            console.error(`[GraphQL error] ${operation.operationName}: ${message}`)

            if (extensions?.code === 'UNAUTHENTICATED') {
                localStorage.removeItem('token')
                window.location.href = '/login'
            }
        })
    } else {
        console.error(`[Network error] ${operation.operationName}:`, error)
    }
})

// ─── 4. Cache ────────────────────────────────────────────────────
// InMemoryCache with typePolicies:
//   keyFields tells Apollo how to uniquely identify each type.
//   Without this, two User objects with the same id may conflict.
const cache = new InMemoryCache({
    typePolicies: {
        User: {
            keyFields: ['id'],
        },
        Order: {
            keyFields: ['id'],
        },
    },
})

// ─── 5. Assemble ─────────────────────────────────────────────────
// from() chains links left-to-right.
// errorLink → authLink → httpLink
export const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache,
    devtools: { enabled: import.meta.env.DEV },
    defaultOptions: {
        watchQuery: {
            // Always validate against cache first, then network if stale
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
        },
        query: {
            errorPolicy: 'all',
        },
    },
})