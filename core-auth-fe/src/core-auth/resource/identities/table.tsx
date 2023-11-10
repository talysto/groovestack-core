import {
  Datagrid,
  DeleteWithConfirmButton,
  Edit,
  FunctionField,
  RaRecord,
  ReferenceManyField,
  SingleFieldList,
  useGetIdentity,
  useRecordContext,
} from 'react-admin'

import LinkOffIcon from '@mui/icons-material/LinkOff'
import { Box, Chip } from '@mui/material'
import { StyledIcon } from '@styled-icons/styled-icon'
import { useParams } from 'react-router-dom'
import { MoreIcons } from '../../components/MoreIcons'

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
                <Chip
                  onClick={undefined}
                  sx={{ backgroundColor: 'transparent', color: 'inherit' }}
                  icon={<Box sx={{pb:'.25em'}} ><Icon size={'1em'} /></Box>}
                  label={<Box>{titleCase(rec.provider)}</Box>}
                />
              )
            }}
          />
          {currentUser && currentUser.id !== id ? (
            <></>
          ) : (
            <DeleteWithConfirmButton
              redirect={false}
              icon={<LinkOffIcon />}
              title="Disconnect"
              confirmTitle="Delete Social Login"
              confirmContent={<ConfirmDeleteIdentityContent />}
              label="Disconnect"
            />
          )}
        </Datagrid>
      </ReferenceManyField>
    </Edit>
  )
}

export const ReferenceManyIdentitiesField = () => (
  <ReferenceManyField
    reference="Identity"
    target="user_id"
    label={false}
    // sort={{ field: 'status', order: 'ASC' }}
    // {...rest}
  >
    <SingleFieldList sx={{ gap: 1 }}>
      <FunctionField
        label="provider"
        render={(rec: RaRecord) => {
          const Icon = identityProviders['google']
          // const Icon = identityProviders[rec.provider]
          console.log(Icon)
          return (
            <Chip
              onClick={undefined}
              label={
                Icon ? (
                  <Icon size={'1em'} />
                ) : (
                  <Box>{titleCase(rec.provider)}</Box>
                )
              }
            />
          )
        }}
      />
    </SingleFieldList>
  </ReferenceManyField>
)
