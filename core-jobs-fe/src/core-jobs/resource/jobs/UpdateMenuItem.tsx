import { ListItemProps, MenuItem } from '@mui/material'
import PropTypes from 'prop-types'
import { ReactElement } from 'react'
import ActionUpdate from '@mui/icons-material/Update';
import {
  BulkActionProps,
  RaRecord,
  UpdateParams,
  // UpdateWithUndoListItem,
  useNotify,
  useRecordContext,
  useRefresh,
  useResourceContext,
  useUpdate,
} from 'react-admin'
import { UseMutationOptions } from 'react-query'
// import { Button, ButtonProps } from './Button';
// import { BulkActionProps } from '../types';


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

  const defaultIcon = <ActionUpdate />;

  const {
    data,
    label = 'ra.action.update',
    icon = defaultIcon,
    onClick,
    mutationOptions = {},
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

  const handleClick = (e: any) => {
    updateMany(
      resource,
      { id: record.id, data, meta: mutationMeta, previousData: record },
      {
        onSuccess,
        onError,
        mutationMode: 'undoable',
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
  filterValues,
  // label,
  selectedIds,
  ...rest
}: Omit<UpdateWithUndoListItemProps, 'resource' | 'icon' | 'data'>) => rest

export interface UpdateWithUndoListItemProps<
  RecordType extends RaRecord = any,
  MutationOptionsError = unknown,
> extends BulkActionProps,
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
