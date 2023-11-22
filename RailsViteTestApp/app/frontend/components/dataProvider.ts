import buildGraphQLProvider, { buildIntrospection, FieldNameConventionEnum, DataProviderExtensions } from '@moonlight-labs/ra-data-graphql-advanced'

import { client } from './client'

export const introspection = buildIntrospection(FieldNameConventionEnum.SNAKE)

export async function initDataProvider(options?: any) {
  return buildGraphQLProvider({
    bulkActionsEnabled: true,
    client: client,
    fieldNameConvention: FieldNameConventionEnum.SNAKE,
    introspection: introspection,
    ...options,
  })
}