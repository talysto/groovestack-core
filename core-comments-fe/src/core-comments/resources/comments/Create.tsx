import React from 'react'

import {
  SimpleForm,
  TextInput,
  SimpleShowLayout,
  Create,
  SaveButton,
  useRecordContext,
} from 'react-admin'
import { PolymorphicReferenceField } from './PolymorphicReferenceField'
import { Avatar, Box, Typography } from '@mui/material'

import { v4 as uuidv4 } from 'uuid'

export const CommentCreate = () => {
  const record = useRecordContext()

  const defaults = {
    id: uuidv4(),
    resource_type: 'Company',
    resource_id: record.id,
    author_type: 'User',
    author_id: '1233',
    created_at: Date.now(),
    updated_at: Date.now(),
  }

  return (
    <Create
      // redirect={false}
      // mutationOptions={}

      sx={{
        '& .RaCreate-card': { boxShadow: 'none' },
        '& .RaCreate-main': { mt: 0 },
      }}
    >
      <SimpleForm toolbar={false} defaultValues={defaults}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Avatar />
          </Box>
          <Box sx={{ flexGrow: 1, m: 1 }}>
            <Typography>Current user name</Typography>
          </Box>
        </Box>
        <TextInput
          source="body"
          multiline
          minRows={2}
          maxRows={6}
          fullWidth
          label="Comment"
        />
        <SaveButton label="Comment" />
      </SimpleForm>
    </Create>
  )
}
