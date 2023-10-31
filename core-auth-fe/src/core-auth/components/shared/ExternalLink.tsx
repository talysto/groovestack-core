import { Avatar, Box, Link } from '@mui/material'

export const ExternalLink = ({
  url,
  title,
  sx,
}: {
  url: string
  title: string
  sx?: object
}) => {
  const httpPattern = /^((http|https):\/\/)/
  if (!httpPattern.test(url)) {
    url = 'http://' + url
  }

  const linkUrl = new URL(url)
  // const avatarUrl = `http://www.google.com/s2/favicons?domain_url=${linkUrl.hostname}`
  const avatarUrl = `https://logo.clearbit.com/${linkUrl.hostname}`

  return (
    <Box sx={sx || { display: 'inline-block' }}>
      <Link
        href={url}
        sx={{ display: 'flex', alignItems: 'center', mr: 1 }}
        rel="noreferrer"
        underline="hover"
        target="_blank"
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            width: '1.25rem',
            height: '1.25rem',
            mr: 1,
            display: 'inline-block',
          }}
          src={avatarUrl}
        />
        {title || linkUrl.hostname}
      </Link>
    </Box>
  )
}
