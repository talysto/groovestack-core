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
import { CoreBase } from '../../../../../core-base-fe/src/core-base'
const CoreDateField = CoreBase.CoreDateField

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
          <CoreDateField source='created_at' showTime={false} />
        </Typography>
      </Box>
    </Box>
  )
}

type CommentStreamProps = {
  createProps: CommentCreateProps
}

export const CommentStream = ({ createProps }: CommentStreamProps) => {
  const record = useRecordContext()
  const mockCommentAttrs = () => {
    return {
      id: uuidv4(),
      body: '',
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    }
  }
  return (
    <>
      <Comments.Create {...createProps} defaultValues={mockCommentAttrs} />

      <ReferenceManyField
        reference="Comment"
        target="resource_id"
        record={record}
        sort={{ field: 'created_at', order: 'DESC' }}
      >
        <Datagrid bulkActionButtons={false}>
          {/* toISOString() */}
          <WrapperField sx={{p:"0!important"}}>
            <AuthorField />
            <Typography >
              <TextField source="body" />
            </Typography>
          </WrapperField>
          {/* <TextField source="created_at" /> */}
          <DeleteWithConfirmButton label="" />
        </Datagrid>
      </ReferenceManyField>
    </>
  )
}
