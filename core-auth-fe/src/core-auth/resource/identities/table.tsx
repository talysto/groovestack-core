import {
  Datagrid,
  DeleteWithConfirmButton,
  FunctionField,
  RaRecord,
  ReferenceManyField,
  SingleFieldList,
  useGetIdentity,
  useGetManyReference,
  useRecordContext
} from 'react-admin'
import { useState } from 'react'

import LinkOffIcon from '@mui/icons-material/LinkOff'
import { Box, Chip } from '@mui/material'
import { StyledIcon } from '@styled-icons/styled-icon'
import { useParams } from 'react-router-dom'
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

  return (
    <Box>
      Are you sure you want to disconnect your {titleCase(record.provider)}{' '}
      login?
    </Box>
  )
}

const IdentitiesList = ({ currentUser, id, total }: { currentUser: any, id: any, total: any }) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div 
    onMouseEnter={(event: any) => {
      setIsHovering(true)
    }}
    onMouseLeave={(event: any) => {
      setIsHovering(false)
    }}
    style={{
      display: 'flex',
      justifyContent: 'space-between'
    }}>
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
      {currentUser && currentUser.id !== id ? (
        null
      ) : isHovering ? (
        <DeleteWithConfirmButton
          redirect={false}
          icon={<LinkOffIcon />}
          title="Disconnect"
          disabled={typeof total === 'undefined' || total <= 1}
          confirmTitle="Disconnect Social Login"
          confirmContent={<ConfirmDeleteIdentityContent />}
        />
      ) : null }
    </div>
  )
}

export const IdentitiesTable = () => {
  const { data: currentUser } = useGetIdentity()
  const { id } = useParams()

  const record = useRecordContext()

  const { total, data } = useGetManyReference('Identity', {
    target: 'user_id',
    id: record.id,
  })

  return (
    <>
      {currentUser && currentUser.id == id ? 
        <ConnectSocialLogin currentUser={currentUser} total={total} id={id} data={data} /> : 
      <></> }
      <ReferenceManyField reference="Identity" target="user_id" label={false}>
        <Datagrid
          bulkActionButtons={false}
        >
          <IdentitiesList currentUser={currentUser} id={id} total={total} />
          </Datagrid>
      </ReferenceManyField>
    </>
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
