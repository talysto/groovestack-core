import { Avatar, Box, Skeleton, Typography } from '@mui/material'

interface Props {
  isLoading?: boolean
  preTitle?: string | React.ReactNode
  title?: string
  subTitle?: string | React.ReactNode
  image?: string
  content?: React.ReactNode
}

export const AvatarLabel = ({
  isLoading = false,
  preTitle,
  title,
  subTitle,
  image,
  content,
}: Props) => {
  const renderPreTitle = () => {
    if (!preTitle) return null

    if (typeof preTitle == 'string')
      return (
        <Typography
          variant="subtitle2"
          sx={{ lineHeight: 1.0, marginTop: '0.2em' }}
        >
          {preTitle}
        </Typography>
      )

    return preTitle
  }

  if (isLoading)
    return (
      <Box sx={{ display: 'inline-block' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Skeleton variant="rounded" width={60} height={60} />
          </Box>

          <Box sx={{ flexGrow: 1, m: 1 }}>
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton
              variant="text"
              sx={{ width: '50%', fontSize: '1rem', m: 0 }}
            />
          </Box>
        </Box>
      </Box>
    )

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Box>
        <Avatar
          variant="rounded"
          sx={{ width: '4rem', height: '4rem' }}
          src={image}
        />
      </Box>

      <Box>
        {renderPreTitle()}
        <Typography
          className="no-translate"
          sx={{ fontWeight: 'bold', marginTop: '0.35em' }}
        >
          {title}
        </Typography>
        {subTitle && typeof subTitle == 'string' ? (
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ marginTop: '0.2em' }}
          >
            {subTitle}
          </Typography>
        ) : (
          <>{subTitle}</>
        )}
        {content && content}
      </Box>
    </Box>
  )
}
