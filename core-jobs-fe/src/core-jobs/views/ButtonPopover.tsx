import { Button, Paper, Popover, SxProps } from '@mui/material'
import { useState } from 'react'

export const ButtonPopover = ({
  label,
  children,
  sx,
}: {
  label: string
  children: any
  sx?: SxProps
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Button sx={sx} aria-describedby={id} onClick={handleClick}>
        {label}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        <Paper sx={{ p: 3 }}>{children}</Paper>
      </Popover>
    </>
  )
}
