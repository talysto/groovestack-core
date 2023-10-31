import CheckIcon from '@mui/icons-material/CheckCircleOutline'
import { Box, Chip } from '@mui/material'

import {
  Datagrid,
  DeleteWithConfirmButton,
  FieldProps,
  ReferenceManyField,
  SimpleForm,
  TextField,
  TextInput,
  UpdateButton,
  WrapperField,
  useNotify,
  useRecordContext,
  useRefresh,
} from 'react-admin'

import { SaveOnlyToolbar } from '../../shared/SaveOnlyToolbar'

export const EmailSettings = () => {
  const notify = useNotify()
  const refresh = useRefresh()

  const onEmailUpdateSuccess = () => {
    notify('Primary email updated', { type: 'success' })
    refresh()
  }

  return (
    <SimpleForm
      toolbar={
        <SaveOnlyToolbar
          type="button"
          mutationOptions={{ onSuccess: onEmailUpdateSuccess }}
        />
      }
    >
      <TextInput source="email" fullWidth />
      <ReferenceManyField
        reference="Email"
        target="user_id"
        label={false}
        fullWidth
        sort={{ field: '', order: '' }}
      >
        <Datagrid bulkActionButtons={false} sx={{ mb: 3 }}>
          <EmailField source="email" />
          <WrapperField source="Actions">
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <MakePrimaryButton />
              <EmailDeleteButton />
            </Box>
          </WrapperField>
        </Datagrid>
      </ReferenceManyField>
    </SimpleForm>
  )
}

const EmailField = (_props: FieldProps) => {
  const record = useRecordContext()

  if (!record) return null

  return (
    <>
      <TextField source="email" />
      {record.primary && (
        <Chip sx={{ ml: 1 }} color="primary" label="Primary" size="small" />
      )}
    </>
  )
}

const MakePrimaryButton = () => {
  const record = useRecordContext()
  const notify = useNotify()
  const refresh = useRefresh()

  const onSuccess = () => {
    notify('Updated Primary Email', { type: 'success' })
    refresh()
  }

  if (!record || record.primary) return null

  return (
    <UpdateButton
      icon={<CheckIcon fontSize="small" />}
      resource="User"
      label="Make Primary"
      data={{ id: record.user_id, email: record.email }}
      mutationMode="pessimistic"
      mutationOptions={{ onSuccess }}
      confirmTitle="Update Primary Email"
      confirmContent={`Are you sure you want to make ${record.email} your primary email?`}
    />
  )
}

const EmailDeleteButton = () => {
  const record = useRecordContext()
  const notify = useNotify()
  const refresh = useRefresh()

  const onEmailDeleteSuccess = () => {
    notify('Email deleted', { type: 'success' })
    refresh()
  }

  return (
    <DeleteWithConfirmButton
      title="Disconnect"
      confirmTitle="Delete Email"
      confirmContent={`Are you sure you want to delete ${record.email}?`}
      label=""
      redirect={false}
      mutationOptions={{ onSuccess: onEmailDeleteSuccess }}
    />
  )
}
