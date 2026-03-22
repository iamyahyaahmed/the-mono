import { GraphQLError } from 'graphql'
import type { Context } from '../../context'

export const queryResolvers = {
    // ── users ───────────────────────────────────────────────────────
    async users(
        _: unknown,
        args: { page?: number; limit?: number },
        { prisma, user }: Context
    ) {
        if (!user) throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
        })

        const page = args.page ?? 1
        const limit = args.limit ?? 20
        const skip = (page - 1) * limit

        // Run count + data fetch in parallel
        const [totalCount, nodes] = await Promise.all([
            prisma.user.count(),
            prisma.user.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
        ])

        return {
            nodes,
            totalCount,
            hasNextPage: skip + limit < totalCount,
        }
    },

    // ── user ────────────────────────────────────────────────────────
    async user(
        _: unknown,
        args: { id: string },
        { prisma, user }: Context
    ) {
        if (!user) throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
        })

        const found = await prisma.user.findUnique({ where: { id: args.id } })

        if (!found) throw new GraphQLError('User not found', {
            extensions: { code: 'NOT_FOUND' },
        })

        return found
    },

    // ── orders ──────────────────────────────────────────────────────
    async orders(
        _: unknown,
        args: { status?: string },
        { prisma, user }: Context
    ) {
        if (!user) throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
        })

        return prisma.order.findMany({
            where: args.status ? { status: args.status as any } : {},
            orderBy: { createdAt: 'desc' },
        })
    },
}