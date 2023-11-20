import {
  PolymorphicReferenceField,
  TimeAgoField,
} from '@groovestack/base'
import { Avatar, Box, Typography } from '@mui/material'
import { TextField } from 'react-admin'

export const AuthorField = () => {
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
        <PolymorphicReferenceField source="author" />
      </Box>
      <Typography sx={{ color: 'text.secondary', fontSize: '80%' }}>
        <TimeAgoField source="created_at" />
      </Typography>
    </Box>
  )
}

export const CommentField = () => {
  return (
    <Box>
      <AuthorField />
      <TextField source="body" />
    </Box>
  )
}
