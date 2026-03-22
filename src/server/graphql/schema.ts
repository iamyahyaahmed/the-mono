import { readFileSync } from 'fs'
import { join } from 'path'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from './resolvers'

// Load the same .graphql file codegen uses — single source of truth
const typeDefs = readFileSync(
    join(__dirname, 'schema.graphql'),
    'utf-8'
)

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})