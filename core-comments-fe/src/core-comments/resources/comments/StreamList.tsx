import React from 'react'

import {
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  ReferenceManyField,
  TextField,
  WrapperField,
  useRecordContext,
} from 'react-admin'
import { v4 as uuidv4 } from 'uuid'

import { PolymorphicReferenceField } from './PolymorphicReferenceField'
import { Typography, Avatar, Box } from '@mui/material'
import { Comments } from '.'
import { CommentCreateProps } from './Create'

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

type CommentStreamProps = {
  createProps: CommentCreateProps
}

export const CommentStream = ({createProps}: CommentStreamProps) => {
  const record = useRecordContext()
  const mockCommentAttrs = {
    id: uuidv4(),
    body: '',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
  }

  return (
    <>
      <Comments.Create {...createProps} defaultValues={mockCommentAttrs} />

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
