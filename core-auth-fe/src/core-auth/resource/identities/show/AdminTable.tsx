import { CodeField } from '@moonlight-labs/core-base-fe'
import { Box } from '@mui/material'
import { StyledIcon } from '@styled-icons/styled-icon'
import {
  Datagrid,
  FunctionField,
  RaRecord,
  ReferenceManyField,
  useGetIdentity,
} from 'react-admin'
import { MoreIcons } from '../../../components/MoreIcons'

export function titleCase(str: string): string {
  return str
    .split(' ')
    .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

const IdentitiesExpand = () => {
  return (
    <CodeField
      source="requestBlob"
      label="omniauth request blob"
    />
  )
}

const { Apple, Facebook, Google, Microsoft } = MoreIcons
const identityProviders: { [k: string]: StyledIcon } = {
  google: Google,
  apple: Apple,
  facebook: Facebook,
  microsoft: Microsoft,
}

export const IdentitiesAdminTable = () => {
  const { data: currentUser } = useGetIdentity()

  return (
    <ReferenceManyField reference="Identity" target="user_id" label={false}>
      <Datagrid
        bulkActionButtons={false}
        expand={<IdentitiesExpand />}
        expandSingle
      >
        <FunctionField
          label="provider"
          render={(rec: RaRecord) => {
            const Icon = identityProviders[rec.provider]

            return (
              <>
                {Icon && <Icon size={'1em'} />}
                <Box sx={{ display: 'inline-block', pl: 0.5 }}>
                  {titleCase(rec.provider)}
                </Box>
              </>
            )
          }}
        />
      </Datagrid>
    </ReferenceManyField>
  )
}
