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
import { Comment } from '../../mockComments'

type Author = {
  id: string;
  type: string;
}

export type CommentCreateProps = {
  authorResolver: () => Author;
  defaultValues?: Comment;
}

export const CommentCreate = ({authorResolver, defaultValues}: CommentCreateProps) => {
  const record = useRecordContext()
  const author = authorResolver()

  const defaults = Object.assign({
    resource_type: record.type,
    resource_id: record.id,
    author_type: author.type,
    author_id: author.id,
  }, (defaultValues && defaultValues))

  return (
    <Create
      // redirect={false}
      // mutationOptions={}
      resource='Comment'
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
