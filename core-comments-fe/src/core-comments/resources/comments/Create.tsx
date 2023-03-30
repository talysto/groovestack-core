import React from 'react'

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
} from 'react-admin'
import { PolymorphicReferenceField } from './PolymorphicReferenceField'
import { Avatar, Box, Typography } from '@mui/material'
import { Comment } from '../../mockComments'
import { useFormContext } from 'react-hook-form';

type Author = {
  id: string;
  type: string;
}

export type CommentCreateProps = {
  authorResolver: () => Author;
  defaultValues?: Comment;
}

// const onSuccess = (data) => {
//   notify(`Changes saved`);
//   // redirect(`/posts/${data.id}`);
// };

const PostCreateToolbar = () => {
  const notify = useNotify();
  const { reset } = useFormContext();

  return (
      <Toolbar>
          <SaveButton
              type="button"
              label="Comment"
              // label="post.action.save_and_add"
              variant="text"
              mutationOptions={{
                  onSuccess: () => {
                      // reset();
                      window.scrollTo(0, 0);
                      notify("changes saved")
                      // notify('ra.notification.created', {
                      //     type: 'info',
                      //     messageArgs: { smart_count: 1 },
                      // });
                  },
              }}
          />
      </Toolbar>
  );
};

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
      // mutationOptions={{ onSuccess }
      resource='Comment'
      sx={{
        '& .RaCreate-card': { boxShadow: 'none' },
        '& .RaCreate-main': { mt: 0 },
      }}
    >
      <SimpleForm toolbar={<PostCreateToolbar />} defaultValues={defaults}>
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
        {/* <CreateButton redirect={false} to={{ state: { skipFormReset: true } }} /> */}
        {/* <SaveButton label="Comment" /> */}
      </SimpleForm>
    </Create>
  )
}
// function useFormContext(): { reset: any } {
//   throw new Error('Function not implemented.')
// }

