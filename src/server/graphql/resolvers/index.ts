import { GraphQLScalarType, Kind } from 'graphql'
import { queryResolvers } from './query.resolver'
import { mutationResolvers } from './mutation.resolver'
import { userResolvers } from './user.resolver'

const DateTime = new GraphQLScalarType({
    name: 'DateTime',
    serialize(value: unknown) {
        if (value instanceof Date) return value.toISOString()
        if (typeof value === 'string') return value
        throw new TypeError(`DateTime cannot represent value: ${value}`)
    },
    parseValue(value: unknown) {
        if (typeof value === 'string' || typeof value === 'number') return new Date(value)
        throw new TypeError(`DateTime cannot parse value: ${value}`)
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) return new Date(ast.value)
        return null
    },
})

export const resolvers = {
    DateTime,
    Query: queryResolvers,
    Mutation: mutationResolvers,
    User: userResolvers,     // field-level resolvers on the User type
}