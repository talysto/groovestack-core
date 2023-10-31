import { Box } from '@mui/material'
import { FileInfo, Widget } from '@uploadcare/react-widget'
import {
  Button,
  useNotify,
  useRecordContext,
  useRefresh,
  useUpdate,
} from 'react-admin'

export const AvatarUpload = () => {
  const record = useRecordContext()
  const [update, { isLoading: updateUserLoading }] = useUpdate()
  const refresh = useRefresh()
  const notify = useNotify()

  const saveToUser = (avatar_url, successText) => {
    update(
      'User',
      {
        id: record.id,
        data: {
          avatar_url: avatar_url,
        },
      },
      {
        onSuccess: () => {
          refresh() // ensure components reset from avatar removal
          notify(successText)
        },
      },
    )
  }

  const remove = () => {
    saveToUser(null, 'Avatar removed')
  }

  const hasAvatar = record.avatar_image.length > 0

  return (
    <Box sx={{ mb: 2 }}>
      <Widget
        publicKey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY}
        id="file"
        imagesOnly="true"
        previewStep="true"
        crop="1:1"
        onChange={(fileInfo: FileInfo) => {
          saveToUser(fileInfo.cdnUrl, 'Avatar updated')
        }}
      />
      <Button
        size="medium"
        label="Remove"
        onClick={remove}
        disabled={!hasAvatar}
      />
    </Box>
  )
}
