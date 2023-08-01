import {
  PolymorphicReferenceField,
  TimeAgoField,
} from '@moonlight-labs/core-base-fe'
import { Avatar, Box, Typography } from '@mui/material'

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

export const Author = () => {
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
