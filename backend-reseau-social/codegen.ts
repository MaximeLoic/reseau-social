import {CodegenConfig} from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: './src/schema.ts',
  ignoreNoDocuments: true,
  generates: {
    './src/types.ts': {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: './context#DataSourceContext',
        mappers: {
          User: './models#User',
          Article: './models#Article',
          Comment: './models#Comment',
          Like: './models#Like',
        }
      }
    }
  }
}
 
export default config