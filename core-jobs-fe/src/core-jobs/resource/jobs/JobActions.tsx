import { CustomButtonDrawer, DrawerWidth } from '@moonlight-labs/core-base-fe'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import { useState } from 'react'
import { FieldProps, useRecordContext } from 'react-admin'
import { DeleteMenuItem } from './DeleteMenuItem'
import { UpdateMenuItem } from './UpdateMenuItem'
import { EditJob } from './edit'

export const JobActions = (props: FieldProps) => {
  const record = useRecordContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()

    setAnchorEl(event.currentTarget)
    return false
  }

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(null)
  }

  if (!record) return null

  return (
    <Box display="flex">
      <CustomButtonDrawer
        mode="edit"
        drawerProps={{ title: 'Job Details' }}
        label={'View'}
        drawerWidth={DrawerWidth.Medium}
        clickableComponent={
          <IconButton aria-label="view" id="view-button" sx={{visibility: 'hidden'}}>
            <VisibilityOutlinedIcon />
          </IconButton>
        }
      >
        <EditJob />
      </CustomButtonDrawer>

      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {(record.actions.includes('run_now') || record.actions.includes('retry')) && (
          <UpdateMenuItem
            label={ record.actions.includes('run_now') ? "Run Now" : "Retry"}
            data={{ instance_method: record.actions.includes('run_now') ? 'run_now!' : 'retry!' }}
            onClick={handleClose}
            mutationMode='pessimistic'
            confirmTitle={ record.actions.includes('run_now') ? "Run Now" : "Retry"}
            confirmContent={ record.actions.includes('run_now') ? "Are you sure you want to run this job now?" : "Are you sure you want to retry this job?"}
          />
        )}
        <DeleteMenuItem label="Delete" onClick={handleClose} />
      </Menu>
    </Box>
  )
}
