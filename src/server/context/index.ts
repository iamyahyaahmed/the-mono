import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
import { createUserLoader } from '../graphql/loaders/user.loader'

// Shape of the decoded JWT payload
interface JwtPayload {
    userId: string
    email: string
}

// The context type — available as 3rd arg in every resolver
export interface Context {
    prisma: typeof prisma
    user: JwtPayload | null   // null = unauthenticated request
    loaders: {
        user: ReturnType<typeof createUserLoader>
    }
}

// Called once per request by expressMiddleware
export async function createContext({
    req,
}: {
    req: Request
    res: Response
}): Promise<Context> {
    let user: JwtPayload | null = null

    const authHeader = req.headers.authorization

    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.slice(7)
        try {
            user = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as JwtPayload
        } catch {
            // Expired or invalid token — treat as unauthenticated
            console.error("INVALID OR NULL")
            user = null
        }
    }

    return {
        prisma,
        user,
        // Fresh DataLoader per request — prevents cross-request cache leaks
        loaders: {
            user: createUserLoader(prisma),
        },
    }
}