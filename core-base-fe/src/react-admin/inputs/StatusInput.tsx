import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroupProps,
  Menu,
  MenuItem,
} from '@mui/material'
import React, { useState } from 'react'

import {
  CommonInputProps,
  FieldTitle,
  Labeled,
  useNotify,
  useRecordContext,
  useResourceContext,
  useUpdate,
} from 'react-admin'

type StatusEvent = { key: string; enabled: boolean; name: string }

/**
 * React Admin Field that updating a status value via permitted state transition events.
 *
 * @component
 *
 * @example
 * return (
 *   <StatusInput source='status' />
 * )
 */
export const StatusInput = (props: FormGroupProps & CommonInputProps) => {
  const { source, className, sx, ...rest } = props
  // const { id, field, fieldState } = useInput({source})
  const record = useRecordContext()
  const resource = useResourceContext()
  const notify = useNotify()

  const [openDialog, setOpenDialog] = useState(false)
  const [update, { isLoading, error }] = useUpdate()
  const [statusEvent, setStatusEvent] = useState<StatusEvent>()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setAnchorEl(null)
  }

  const handleYes = () => {
    update(resource, {
      id: record.id,
      data: { status_event: statusEvent?.key },
      previousData: record,
    })
    setOpenDialog(false)
    setAnchorEl(null)
  }

  React.useEffect(() => {
    if (error)
      notify(
        `There was an error updating the ${resource} status: ${
          (error as any).message
        }`,
        { type: 'error' },
      )
  }, [error])

  // if (!record) return null
  return (
    // <FormGroup
    //   className={clsx('ra-input', `ra-input-${source}`, className)}
    //   // row={row}
    //   sx={sx}>
    <>
      <Labeled sx={sx} label={<FieldTitle source={source} />}>
        <>
          <Button
            id="basic-button"
            size="medium"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            {record.status}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {record?.status_events?.map(
              (statusEvent: StatusEvent, i: number) => (
                <MenuItem
                  key={i}
                  disabled={!statusEvent.enabled}
                  value={statusEvent.name}
                  onClick={() => {
                    setStatusEvent(statusEvent)
                    setOpenDialog(true)
                    // setAnchorEl(null)
                  }}
                >
                  {statusEvent.name}
                </MenuItem>
              ),
            )}
          </Menu>
        </>
      </Labeled>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{resource} Status Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you would like to ${statusEvent?.name.toLowerCase()} this ${resource}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
    // </FormGroup>
  )
}
