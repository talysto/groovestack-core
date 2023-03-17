import {
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  ReferenceManyField,
  TextField,
  WrapperField,
  useRecordContext,
} from 'react-admin'
import { PolymorphicReferenceField } from './PolymorphicReferenceField'
import { Typography, Avatar, Box } from '@mui/material'
import { Versions } from '.'

const ActorField = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box>
        <Avatar />
      </Box>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Typography>
          <PolymorphicReferenceField source="actor" />
        </Typography>
        <Typography>
          <DateField source="created_at" />
        </Typography>
      </Box>
    </Box>
  )
}

export const VersionStream = () => {
  const record = useRecordContext()

  return (
    <>
      <ReferenceManyField
        reference="Version"
        target="resource_id"
        record={record}
      >
        <Datagrid bulkActionButtons={false}>
          <WrapperField>
            <ActorField />

            <Typography>{/* <TextField source="body" /> */}</Typography>
          </WrapperField>
          <DeleteWithConfirmButton label="" />
        </Datagrid>
      </ReferenceManyField>
    </>
  )
}
