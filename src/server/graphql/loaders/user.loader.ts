import DataLoader from 'dataloader'
import type { PrismaClient, User } from '@prisma/client'

// Install: npm install dataloader
//
// Without DataLoader — fetching 20 users with their orders:
//   1 query for users  +  20 queries for orders  =  21 queries  ❌
//
// With DataLoader — same request:
//   1 query for users  +  1 batched query for all orders  =  2 queries  ✓

export function createUserLoader(prisma: PrismaClient) {
    return new DataLoader<string, User | null>(async (ids) => {
        const users = await prisma.user.findMany({
            where: { id: { in: [...ids] } },
        })

        // DataLoader requires results in the same order as the input ids
        const userMap = new Map(users.map((u) => [u.id, u]))
        return ids.map((id) => userMap.get(id) ?? null)
    })
}