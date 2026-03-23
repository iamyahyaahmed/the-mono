import { GraphQLError } from 'graphql'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { Context } from '../../context'

export const mutationResolvers = {
    // ── login ────────────────────────────────────────────────────────
    async login(
        _: unknown,
        args: { email: string; password: string },
        { prisma }: Context
    ) {
        const user = await prisma.user.findUnique({ where: { email: args.email } })

        // Same error for "not found" and "wrong password" — prevents user enumeration
        if (!user) throw new GraphQLError('Invalid credentials', {
            extensions: { code: 'UNAUTHENTICATED' },
        })

        const valid = await bcrypt.compare(args.password, user.password)
        if (!valid) throw new GraphQLError('Invalid credentials', {
            extensions: { code: 'UNAUTHENTICATED' },
        })

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        )

        return { token, user }
    },

    // ── createUser ───────────────────────────────────────────────────
    async createUser(
        _: unknown,
        args: { input: { name: string; email: string; password: string } },
        { prisma }: Context
    ) {
        const existing = await prisma.user.findUnique({
            where: { email: args.input.email },
        })

        if (existing) throw new GraphQLError('Email already in use', {
            extensions: { code: 'BAD_USER_INPUT' },
        })

        const hashed = await bcrypt.hash(args.input.password, 12)

        return prisma.user.create({
            data: { ...args.input, password: hashed },
        })
    },

    // ── updateUser ───────────────────────────────────────────────────
    async updateUser(
        _: unknown,
        args: { id: string; input: { name?: string; email?: string } },
        { prisma, user }: Context
    ) {
        if (!user) throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
        })

        return prisma.user.update({
            where: { id: args.id },
            data: args.input,
        })
    },

    // ── deleteUser ───────────────────────────────────────────────────
    async deleteUser(
        _: unknown,
        args: { id: string },
        { prisma, user }: Context
    ) {
        if (!user) throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
        })

        return prisma.user.delete({ where: { id: args.id } })
    },

    // ── createOrder ──────────────────────────────────────────────────
    async createOrder(
        _: unknown,
        args: { input: { userId: string; total: number } },
        { prisma, user }: Context
    ) {
        if (!user) throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
        })

        return prisma.order.create({ data: args.input })
    },
}