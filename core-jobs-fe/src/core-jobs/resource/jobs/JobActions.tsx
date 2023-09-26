import { CustomButtonDrawer, DrawerWidth } from '@moonlight-labs/core-base-fe'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ListItem } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import { useState } from 'react'
import { FieldProps } from 'react-admin'
import { DeleteMenuItem } from './DeleteMenuItem'
import { UpdateMenuItem } from './UpdateMenuItem'
import { EditJob } from './edit'

// export const JobActions = ({ label = 'Actions' }: { label?: string; }) => {
//   const record = useRecordContext();

//   if (!record) return null;

//   return (
//     <Box
//       className="show-on-hover"
//       sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}
//     >
//       {record.actions.includes('retry') && (
//         <UpdateButton label="Retry" data={{}} />
//       )}
//       <CustomButtonDrawer
//         label=" "
//         drawerProps={{ title: 'Edit Jobs' }}
//         // sx={{ display: 'inline-flex' }}
//         mode="edit"
//         drawerWidth={DrawerWidth.Medium}
//         editProps={{ actions: <JobsEditActions /> }}
//       >
//         <EditJob />
//       </CustomButtonDrawer>
//       <DeleteWithConfirmButton color="primary" label="" />

//     </Box>
//   );
// };

const ITEM_HEIGHT = 48

function deleteJob() {
  alert('delete job with confirmation')
}

function retryJob() {
  alert('retry job')
}

function viewJob() {
  alert('open job drawer')
}

export const JobActions = (props: FieldProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation
    setAnchorEl(event.currentTarget)
    return false
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
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
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {/* <MenuItem key={'view'} onClick={viewJob}>
          View
        </MenuItem> */}
        <CustomButtonDrawer
          label=" "
          drawerProps={{ title: 'Edit Jobs' }}
          // sx={{ display: 'inline-flex' }}
          mode="edit"
          // onClickableComponentClick={handleClose}
          drawerWidth={DrawerWidth.Medium}
          clickableComponent={<ListItem>View</ListItem>}
        >
          <EditJob />
        </CustomButtonDrawer>
        <UpdateMenuItem
          label="Retry"
          data={{ status: 'retry!' }}
          onClick={handleClose}
        />
        <DeleteMenuItem title="test" label="Delete" onClick={handleClose} />
      </Menu>
    </div>
  )
}
