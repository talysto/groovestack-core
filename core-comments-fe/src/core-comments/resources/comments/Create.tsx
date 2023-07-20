import {
  SimpleForm,
  TextInput,
  Create,
  SaveButton,
  useRecordContext,
  useNotify,
  Toolbar,
  useRefresh,
  useGetIdentity,
} from 'react-admin'

import { useFormContext } from 'react-hook-form'
import { AuthorField } from './AuthorField'
import { Avatar, Box } from '@mui/material'

export type CommentCreateProps = {
  // authorResolver: () => Author
  // defaultValues?: () => Comment
}

export const CommentCreate = ({}: CommentCreateProps) => {
  const record = useRecordContext()

  if (!record) return null

  function defaults() {
    return Object.assign(
      {
        resource_type: record.type,
        resource_id: record.id,
      },
      {},
      // defaultValues ? defaultValues() : {},
    )
  }

  const CommentCreateToolbar = () => {
    const notify = useNotify()
    const formContext = useFormContext()
    const refresh = useRefresh()

    return (
      <Toolbar
        sx={{
          justifyContent: 'flex-end',
          background: 'transparent',
          p: 0,
          m: 0,
        }}
      >
        <SaveButton
          type="button"
          label="Leave a Comment"
          mutationOptions={{
            onSuccess: () => {
              refresh()
              formContext.reset(defaults())
              window.scrollTo(0, 0)
              notify('changes saved')
            },
          }}
        />
      </Toolbar>
    )
  }

  return (
    <Create
      resource="Comment"
      sx={{
        '& .RaCreate-card': { boxShadow: 'none' },
        '& .RaCreate-main': { mt: 0 },
      }}
    >
      <SimpleForm
        toolbar={<CommentCreateToolbar />}
        defaultValues={defaults()}
        sx={{ p: 0, pt: 2 }}
      >
        <CurrentUserField />
        <TextInput
          source="body"
          multiline
          minRows={2}
          maxRows={6}
          fullWidth
          label={'Leave a comment'}
        />
      </SimpleForm>
    </Create>
  )
}

const CurrentUserField = () => {
  const {
    data: currentUser,
    isLoading: identityLoading,
    error,
  } = useGetIdentity()

  if (!currentUser) return null

  const { id, name } = currentUser || {}

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ width: '1em', height: '1em', mr: 1 }} />
        {name}
      </Box>
      {/* <Typography sx={{ color: 'text.secondary', fontSize: '80%' }}>
    <TimeAgoField source="created_at" />
  </Typography> */}
    </Box>
  )
}
