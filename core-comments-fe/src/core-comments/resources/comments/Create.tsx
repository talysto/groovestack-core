import React from 'react'

import {
  SimpleForm,
  TextInput,
  Create,
  SaveButton,
  useRecordContext,
  useNotify,
  Toolbar,
  useRefresh,
} from 'react-admin'
import { Avatar, Box, Typography } from '@mui/material'
import { Comment } from '../../mockComments'
import { useFormContext } from 'react-hook-form';

type Author = {
  id: string;
  type: string;
  name: string;
}

export type CommentCreateProps = {
  authorResolver: () => Author;
  defaultValues?: () => Comment;
}

export const CommentCreate = ({ authorResolver, defaultValues }: CommentCreateProps) => {
  const record = useRecordContext()
  const author = authorResolver()

  if (!record) return null

  console.log(record)

  function defaults() {
    return Object.assign({
      resource_type: record.type,
      resource_id: record.id,
    }, (defaultValues ? defaultValues() : {}))
  }

  const PostCreateToolbar = () => {
    const notify = useNotify()
    const formContext = useFormContext()
    const refresh = useRefresh()

    return (
      <Toolbar sx={{ justifyContent: 'flex-end', background: 'transparent', padding: 0 }}>
        <SaveButton
          type="button"
          label="Comment"
          mutationOptions={{
            onSuccess: () => {
              refresh();
              formContext.reset(defaults());
              window.scrollTo(0, 0);
              notify("changes saved")
            },
          }}
        />
      </Toolbar>
    );
  };

  return (
    <Create
      resource='Comment'
      sx={{
        '& .RaCreate-card': { boxShadow: 'none' },
        '& .RaCreate-main': { mt: 0 },
      }}
    >
      <SimpleForm toolbar={<PostCreateToolbar />} defaultValues={defaults()} sx={{ p: 0, pt: 2 }}  >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Box>
            <Avatar />
          </Box>
          <Box sx={{ flexGrow: 1, m: 1 }}>
            <Typography>
              {author.name}
              {/* <ReferenceField resource="Comment" source={author.id} reference="User" /> */}
            </Typography>
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
      </SimpleForm>
    </Create>
  )
}
