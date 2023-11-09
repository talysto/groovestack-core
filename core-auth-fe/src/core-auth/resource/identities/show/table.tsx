import { 
  Edit, 
  DeleteWithConfirmButton,
  Datagrid, 
  ReferenceManyField, 
  FunctionField,
  RaRecord,
  useRecordContext,
  useGetIdentity
} from 'react-admin'

import { Box } from '@mui/material'
import { MoreIcons } from '../../../components/MoreIcons'
import { StyledIcon } from '@styled-icons/styled-icon'
import { useParams } from 'react-router-dom'

const { Apple, Facebook, Google, Microsoft } = MoreIcons
const identityProviders: { [k: string]: StyledIcon } = {
  google: Google,
  apple: Apple,
  facebook: Facebook,
  microsoft: Microsoft,
}

export function titleCase(str: string): string {
  return str
    .split(' ')
    .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

const ConfirmDeleteIdentityContent = () => {
  const record = useRecordContext()

  return (
    <Box>
      Are you sure you want to delete your {titleCase(record.provider)} login?
    </Box>
  )
}

export const IdentitiesTable = () => {
    const { data: currentUser } = useGetIdentity()
    const { id } = useParams()

    return (
      <Edit actions={false}>
        <ReferenceManyField
          reference="Identity"
          target="user_id"
          label={false}
          // sort={{ field: 'status', order: 'ASC' }}
          // {...rest}
        >
        <Datagrid bulkActionButtons={false}>
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
          {currentUser && currentUser.id !== id ? <></> :
            <DeleteWithConfirmButton
              redirect={false}
              title="Disconnect"
              confirmTitle="Delete Social Login"
              confirmContent={<ConfirmDeleteIdentityContent />}
            />
          }
        </Datagrid>
      </ReferenceManyField>
    </Edit>
  )
}