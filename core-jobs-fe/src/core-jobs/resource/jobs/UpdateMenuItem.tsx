// import { Update as ActionUpdate } from '@mui/icons-material'
import { ListItemProps, MenuItem } from '@mui/material'
import { MouseEventHandler, ReactElement, useState } from 'react'
import {
  RaRecord,
  UpdateParams,
  // UpdateWithUndoListItem,
  useNotify,
  useRecordContext,
  useRefresh,
  useResourceContext,
  useUpdate,
  Confirm
} from 'react-admin'
import { UseMutationOptions } from '@tanstack/react-query'
// import { Button, ButtonProps } from './Button';

//TODO: this is a copy of UpdateWithUndoListItem.tsx, but with the Button component replaced with MenuItem.
//1. replace props: any with an appropriate version of props: UpdateWithUndoButtonProps
//2. decide if we want to use icons and support that appropriately
//3. update the prop types for the list item instead of the button
//4. confirm functionality is appropriate
//5. NTH - add props undoable and confirm?

export const UpdateMenuItem = (props: any) => {
  // (props : UpdateWithUndoButtonProps) => {
  const record = useRecordContext(props)
  const notify = useNotify()
  const resource = useResourceContext(props)
  const refresh = useRefresh()
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)

  if (!record) return null

  const {
    data,
    label = 'ra.action.update',
    onClick,
    mutationOptions = {},
    confirmContent,
    confirmTitle,
    mutationMode = 'undoable',
    ...rest
  } = props

  const [updateMany, { isLoading }] = useUpdate()

  const {
    meta: mutationMeta,
    onSuccess = () => {
      notify('ra.notification.updated', {
        type: 'info',
        messageArgs: { smart_count: 1 },
        undoable: true,
      })
    },
    onError = (error: Error | string) => {
      notify(
        typeof error === 'string'
          ? error
          : error.message || 'ra.notification.http_error',
        {
          type: 'error',
          messageArgs: {
            _:
              typeof error === 'string'
                ? error
                : error && error.message
                ? error.message
                : undefined,
          },
        },
      )
      refresh()
    },
    ...otherMutationOptions
  } = mutationOptions

  const handleClick : MouseEventHandler = (e) => {
    updateMany(
      resource,
      { id: record.id, data, meta: mutationMeta, previousData: record },
      {
        onSuccess,
        onError,
        mutationMode,
        ...otherMutationOptions,
      },
    )
    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  // return (
  //     <Button
  //         onClick={handleClick}
  //         label={label}
  //         disabled={isLoading}
  //         {...sanitizeRestProps(rest)}
  //     >
  //         {icon}
  //     </Button>
  // );

  if (confirmContent && confirmTitle) {
    return (
      <>
        <Confirm
          isOpen={open}
          loading={isLoading}
          title={confirmTitle}
          content={confirmContent}
          onConfirm={handleClick}
          onClose={onClose}
        />
        <MenuItem
          onClick={onOpen}
          disabled={isLoading}
          {...sanitizeRestProps(rest)}
        >
          {label}
        </MenuItem>
      </>
    )
  }

  return (
    <MenuItem
      onClick={handleClick}
      disabled={isLoading}
      {...sanitizeRestProps(rest)}
    >
      {label}
    </MenuItem>
  )
}

const sanitizeRestProps = ({
  // filterValues,
  // label,
  // selectedIds,
  ...rest
}: Omit<UpdateWithUndoListItemProps, 'resource' | 'icon' | 'data'>) => rest

export interface UpdateWithUndoListItemProps<
  RecordType extends RaRecord = any,
  MutationOptionsError = unknown,
> extends
    ListItemProps {
  icon?: ReactElement
  data: any
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    UpdateParams<RecordType>
  > & { meta?: any }
}

// UpdateWithUndoListItem.propTypes = {
//   label: PropTypes.string,
//   resource: PropTypes.string,
//   record: PropTypes.object,
//   icon: PropTypes.element,
//   data: PropTypes.any.isRequired,
// }
