import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroupProps,
  Menu,
  MenuItem,
} from '@mui/material'
import { useEffect, useState } from 'react'

import {
  CommonInputProps,
  FieldTitle,
  Labeled,
  UseUpdateOptions,
  useNotify,
  useRecordContext,
  useResourceContext,
  useSaveContext,
  useUpdate,
} from 'react-admin'

type StatusEvent = { key: string; enabled: boolean; name: string }

/**
 * React Admin Field that updating a status value via permitted state transition events.
 *
 * @component
 *
 * @example
 * <StatusInput source='status' />
 *
 * @example Usage in a DataGrid as an editable column
 * <WrapperField label='status'>
 *   <StatusInput source="status" label={false} />
 * </WrapperField>
 */


type StatusInputProps = FormGroupProps & CommonInputProps & {
  buttonProps?: ButtonProps
  updateOptions?: UseUpdateOptions
}

export const StatusInput = (props: StatusInputProps) => {
  const { source, label, isRequired, className, sx, buttonProps, updateOptions, ...rest } = props
  // const { id, field, fieldState } = useInput({source})
  const record = useRecordContext()
  const resource = useResourceContext()
  // const { id, field, fieldState, formState, isRequired } = useInput({ source})

  const notify = useNotify()

  const [openDialog, setOpenDialog] = useState(false)
  const [update, { isLoading, error }] = useUpdate()
  const saveContext = useSaveContext()
  const [statusEvent, setStatusEvent] = useState<StatusEvent>()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setOpenDialog(false)
    setAnchorEl(null)
  }

  const handleYes = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    const { save } = saveContext || {}
    
    if (save) {
      // in a create / edit context. use save so that mutation options are passed through
      save({ status_event: statusEvent?.key })
    } else
      update(resource, {
        id: record.id,
        data: { status_event: statusEvent?.key },
        previousData: record,
      }, updateOptions
    )

    setOpenDialog(false)
    setAnchorEl(null)
  }

  useEffect(() => {
    if (error)
      notify(
        `There was an error updating the ${resource} status: ${
          (error as any).message
        }`,
        { type: 'error' },
      )
  }, [error])

  if (!record) return null

  return (
    // <FormGroup
    //   className={clsx('ra-input', `ra-input-${source}`, className)}
    //   // row={row}
    //   sx={sx}>
    // https://github.com/marmelab/react-admin/blob/dcf8eaf703e9c4d991193cf39c4f5c3a0396d384/packages/ra-ui-materialui/src/input/TextInput.tsx#L70
    <Labeled
      label={
        label !== '' && label !== false ? (
          <FieldTitle
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
          />
        ) : (
          false
        )
      }
    >
      <>
        <Button
          id="basic-button"
          size="medium"
          {...buttonProps}
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
          {record?.status_events?.map((statusEvent: StatusEvent, i: number) => (
            <MenuItem
              key={i}
              disabled={!statusEvent.enabled}
              value={statusEvent.name}
              onClick={(event) => {
                event.stopPropagation()
                setStatusEvent(statusEvent)
                setOpenDialog(true)
                // setAnchorEl(null)
              }}
            >
              {statusEvent.name}
            </MenuItem>
          ))}
        </Menu>

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
    </Labeled>
  )
}
