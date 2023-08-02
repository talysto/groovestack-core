import {
  Create,
  SaveButton,
  SimpleForm,
  TextInput,
  useGetIdentity,
  useNotify,
  useRecordContext,
  useRefresh,
} from 'react-admin'

import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import { Avatar, Box, InputAdornment } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export type CommentCreateProps = {
  // authorResolver: () => Author
  // defaultValues?: () => Comment
}

const CommentButton = () => {
  return (
    <SaveButton>
      <EditNoteOutlinedIcon />
    </SaveButton>
  )
}

export const CommentCreate = ({}: CommentCreateProps) => {
  const record = useRecordContext()
  const formContext = useFormContext()
  const notify = useNotify()
  const refresh = useRefresh()

  if (!record) return null

  function defaults() {
    return Object.assign(
      {
        resource_type: record.type,
        resource_id: record.id,
        body: '',
      },
      {},
      // defaultValues ? defaultValues() : {},
    )
  }

  return (
    <Create
      resource="Comment"
      sx={{
        '& .RaCreate-card': { boxShadow: 'none' },
        '& .RaCreate-main': { mt: 0 },
      }}
      redirect={false}
      mutationOptions={{
        onSuccess: () => {
          // TODO Clear the form
          // @ts-ignore-line
          // document.getElementById("commentCreateForm").reset();
          // formContext.reset(defaults())
          // refresh()
          // notify('changes saved')
        },
      }}
    >
      <SimpleForm
        id="commentCreateForm"
        toolbar={false}
        // toolbar={<CommentCreateToolbar />}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CommentButton />
              </InputAdornment>
            ),
          }}
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
