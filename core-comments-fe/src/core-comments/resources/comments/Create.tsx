import {
  Create,
  SaveButton,
  SimpleForm,
  TextInput,
  useGetIdentity,
  useRecordContext,
} from 'react-admin'

import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import { Avatar, Box, InputAdornment } from '@mui/material'
// import { useFormContext } from 'react-hook-form'

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

// props: CommentCreateProps
export const CommentCreate = () => {
  const record = useRecordContext()
  // const formContext = useFormContext()
  // const notify = useNotify()
  // const refresh = useRefresh()

  if (!record) return null

  function defaults() {
    return record && Object.assign(
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
        defaultValues={defaults()}
        sx={{ p: 0, pt: 2 }}
      >
        <TextInput
          source="body"
          multiline
          minRows={2}
          maxRows={6}
          fullWidth
          label={<CurrentUserField />}
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
    data: currentUser
  } = useGetIdentity()

  if (!currentUser) return null

  const { name } = currentUser || {}

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
