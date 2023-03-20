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
import { Comments } from '.'

const AuthorField = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box>
        <Avatar />
      </Box>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Typography>
          <PolymorphicReferenceField source="author" />
        </Typography>
        <Typography>
          <DateField source="created_at" />
        </Typography>
      </Box>
    </Box>
  )
}

export const CommentStream = () => {
  const record = useRecordContext()

  return (
    <>
      <Comments.Create />

      <ReferenceManyField
        reference="Comment"
        target="resource_id"
        record={record}
      >
        <Datagrid bulkActionButtons={false}>
          <WrapperField>
            <AuthorField />

            <Typography>
              <TextField source="body" />
            </Typography>
          </WrapperField>
          <DeleteWithConfirmButton label="" />
        </Datagrid>
      </ReferenceManyField>
    </>
  )
}
