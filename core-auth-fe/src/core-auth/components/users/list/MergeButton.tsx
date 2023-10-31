import { gql } from '@apollo/client'
import UserMergeIcon from '@mui/icons-material/CallMerge'
import { Alert, Box, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'
import {
  Button,
  Confirm,
  ShowButton,
  useListContext,
  useNotify,
  useRefresh,
  useUnselectAll,
} from 'react-admin'

import { dPClient } from '../../../dataProvider/graphqlData/client'

const usersMergeMutation = gql`
  mutation users_merge($ids: [ID!]!) {
    users_merge(ids: $ids) {
      id
    }
  }
`

export const MergeButton = () => {
  const { data, selectedIds } = useListContext()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const refresh = useRefresh()
  const notify = useNotify()
  const unselectAll = useUnselectAll('User')

  const handleClick = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  const handleConfirm = async () => {
    setLoading(true)

    try {
      const {
        data: { users_merge: mergedUser },
      } = await dPClient.mutate({
        mutation: usersMergeMutation,
        variables: { ids: selectedIds },
      })

      handleDialogClose()

      notify(
        <Alert severity="success" icon={false}>
          <ShowButton
            resource="User"
            record={mergedUser}
            label="View merged user"
          />
        </Alert>,
      )
      refresh()
      unselectAll()
    } catch (e: any) {
      notify(`Error: ${e.message}`, { type: 'error' })
    }

    setLoading(false)
  }

  const confirmContent = () => {
    const users = data
      .filter((u) => selectedIds.includes(u.id))
      .map((u) => `${u.name}${u.email ? ` (${u.email})` : ''}`)

    return (
      <Box>
        <Typography variant="body1">
          {`Are you sure you want to merge ${users
            .slice(0, users.length - 1)
            .join(', ')} and ${users[users.length - 1]}?`}
        </Typography>
        {loading && (
          <Box component="p" sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress size="1.5rem" />
            <Typography sx={{ ml: 1 }} variant="body2">
              Merging users...
            </Typography>
          </Box>
        )}
      </Box>
    )
  }

  return (
    <>
      <Button
        label="Merge"
        onClick={handleClick}
        startIcon={<UserMergeIcon />}
        disabled={selectedIds.length < 2}
      />
      <Confirm
        isOpen={open}
        loading={loading}
        title="Merge User Account Confirmation"
        content={confirmContent()}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  )
}
