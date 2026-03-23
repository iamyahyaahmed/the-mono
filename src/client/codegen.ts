import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'src/graphql/schema.graphql',
    documents: ['src/**/*.{tsx,ts}'],
    generates: {
        'src/gql/': {
            preset: 'client',
            presetConfig: {
                fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
            },
        },
    },
}

export default config