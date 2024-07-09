import {
  Datagrid,
  DeleteWithConfirmButton,
  FunctionField,
  RaRecord,
  ReferenceManyField,
  SingleFieldList,
  useGetIdentity,
  useListContext,
  useRecordContext
} from 'react-admin'
import { useState } from 'react'

import LinkOffIcon from '@mui/icons-material/LinkOff'
import { Box, Chip } from '@mui/material'
import { StyledIcon } from '@styled-icons/styled-icon'
import { MoreIcons } from '../../components/MoreIcons'
import { ConnectSocialLogin } from './ConnectSocialLogin'

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
  if (!record) return null

  return (
    <Box>
      Are you sure you want to disconnect your {titleCase(record.provider)}{' '}
      login?
    </Box>
  )
}

const IdentityRow = ({ actionsEnabled, user }: { actionsEnabled: boolean, user: RaRecord }) => {
  const [isHovering, setIsHovering] = useState(false)
  const { total } = useListContext()
  if (!total) return null

  const deletable = total > 1 || user.has_email_provider

  return (
    <div 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <FunctionField
        render={(rec: RaRecord) => {
          const Icon = identityProviders[rec.provider]
          return (
              <Chip
                onClick={undefined}
                sx={{ backgroundColor: 'transparent', color: 'inherit' }}
                icon={
                  <Box sx={{ pb: '.25em' }}>
                    <Icon size={'1em'} />
                  </Box>
                }
                label={<Box>{titleCase(rec.provider)}</Box>}
              />
            )
          }
        }
      />
      {
        actionsEnabled && isHovering && (
          <DeleteWithConfirmButton
            redirect={false}
            icon={<LinkOffIcon />}
            title="Disconnect"
            disabled={!deletable}
            confirmTitle="Disconnect Social Login"
            confirmContent={<ConfirmDeleteIdentityContent />}
          />
        )
      }
    </div>
  )
}

export const IdentitiesTable = () => {
  const { data: currentUser } = useGetIdentity()
  const record = useRecordContext()

  if (!(record && currentUser)) return null

  return (
    <ReferenceManyField reference="Identity" target="user_id" label={false}>
      {currentUser.id == record.id && <ConnectSocialLogin />}
      <Datagrid bulkActionButtons={false}>
        <IdentityRow actionsEnabled={record.id == currentUser.id} user={record} />
      </Datagrid>
    </ReferenceManyField>
  )
}

export const EnabledIdentitiesIcons = () => (
  <ReferenceManyField
    reference="Identity"
    target="user_id"
    label={false}
  >
    <SingleFieldList sx={{ gap: 1 }}>
      <FunctionField
        label="provider"
        render={(rec: RaRecord) => {
          const Icon = identityProviders[rec.provider]
          
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
