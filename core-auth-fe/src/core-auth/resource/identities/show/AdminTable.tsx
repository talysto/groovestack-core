import { 
  Datagrid, 
  FunctionField,
  RaRecord,
  useGetIdentity,
  ReferenceManyField
} from 'react-admin'
import { Box } from '@mui/material'
import { MoreIcons } from '../../../components/MoreIcons'
import { StyledIcon } from '@styled-icons/styled-icon'
import { CodeField } from '@moonlight-labs/core-base-fe'


export function titleCase(str: string): string {
  return str
    .split(' ')
    .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

const IdentitiesExpand = () => {
  return (
    <CodeField
      record={{
        requestBlob: {
          provider: 'google', // Replace with the actual OmniAuth provider you are mocking
          uid: '123456789', // Replace with a unique user identifier
          info: {
            email: 'user@example.com',
            name: 'John Doe',
            // Additional user information specific to the provider
          },
          credentials: {
            token: 'your_access_token',
            expires: false,
            // Additional credentials specific to the provider
          },
          extra: {
            // Additional data specific to the provider
          },
        },
      }}
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
    <ReferenceManyField
      reference="Identity"
      target="user_id"
      label={false}
    >
      <Datagrid bulkActionButtons={false} expand={<IdentitiesExpand />} expandSingle>
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