import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import { schema } from './graphql/schema'
import { createContext } from './context'
import { prisma } from './lib/prisma'

async function main() {
    const app = express()

    // ── Apollo Server ────────────────────────────────────────────────
    // ApolloServer v4 is framework-agnostic — expressMiddleware bridges it.
    const server = new ApolloServer({
        schema,
        // Hides stack traces from clients in production
        includeStacktraceInErrorResponses: process.env.NODE_ENV !== 'production',
    })

    // Must call start() before attaching as middleware
    await server.start()
    console.log(process.env.CLIENT_URL)
    // ── Express middleware ───────────────────────────────────────────
    app.use(cors({
        origin: process.env.CLIENT_URL ?? 'http://localhost:3000',
        credentials: true,
    }))
    app.use(express.json())

    // ── GraphQL endpoint ─────────────────────────────────────────────
    // context factory runs on every request — injects prisma + user.
    app.use(
        '/graphql',
        expressMiddleware(server, {
            context: createContext,
        })
    )

    // ── Health check ─────────────────────────────────────────────────
    app.get('/health', (_req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() })
    })

    const PORT = process.env.PORT ?? '4000'
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
    })
}

// Graceful shutdown — close Prisma pool on process exit
process.on('SIGINT', async () => {
    await prisma.$disconnect()
    process.exit(0)
})

main().catch(console.error)