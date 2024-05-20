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
         User : './src/models.ts#User',
            Article : './src/models.ts#Article',
            Comment : './src/models.ts#Comment',
            Like : './src/models.ts#Like',
        }
      }
    }
  }
}
 
export default config