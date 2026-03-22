import type { Context } from '../../context'
import type { User } from '@prisma/client'

// Field resolvers run when a query explicitly requests these fields.
// Without this, requesting user.orders would fire one DB query per user — the N+1 problem.
export const userResolvers = {
    // orders is resolved via DataLoader — batches ALL user ids from
    // the current response into a single WHERE userId IN (...) query
    async orders(parent: User, _: unknown, { prisma }: Context) {
        return prisma.order.findMany({
            where: { userId: parent.id },
            orderBy: { createdAt: 'desc' },
        })
    },
}