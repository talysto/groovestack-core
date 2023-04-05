// import React from 'react'

import {
  SimpleForm,
  TextInput,
  SimpleShowLayout,
  Create,
  SaveButton,
  useRecordContext,
  CreateButton,
  useNotify,
  Toolbar,
  useRefresh,
  ReferenceField,
} from 'react-admin'
import { PolymorphicReferenceField } from './PolymorphicReferenceField'
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
  defaultValues: () => Comment;
}

export const CommentCreate = ({ authorResolver, defaultValues }: CommentCreateProps) => {
  const record = useRecordContext()
  const author = authorResolver()

  function defaults() {
    console.log("running defaults again")
    return Object.assign({
      resource_type: record.type,
      resource_id: record.id,
      author_type: author.type,
      author_id: author.id,
    }, (defaultValues()))
  }

  const PostCreateToolbar = () => {
    const notify = useNotify();
    const formContext = useFormContext();
    // console.log("formContext = ", formContext)
    const refresh = useRefresh();
    return (
      <Toolbar>
        <SaveButton
          type="button"
          label="Comment"
          variant="text"
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
      <SimpleForm toolbar={<PostCreateToolbar />} defaultValues={defaults()}  >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
