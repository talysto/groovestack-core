// import { Delete as ActionDelete } from '@mui/icons-material'
import clsx from 'clsx'
import React, { Fragment, ReactElement, ReactEventHandler } from 'react'
// import inflection from 'inflection';
import { MenuItem, MenuItemProps } from '@mui/material'
import {
  Confirm,
  DeleteParams,
  MutationMode,
  RaRecord,
  RedirectionSideEffect,
  useDeleteWithConfirmController,
  useRecordContext,
  useResourceContext,
} from 'react-admin'
import { UseMutationOptions } from 'react-query'
// import { Confirm } from '../layout';
// import { Button, ButtonProps } from './Button';

export const DeleteMenuItem = <RecordType extends RaRecord>(
  props: DeleteMenuItemProps<RecordType>,
) => {
  const {
    className,
    confirmTitle = 'ra.message.delete_title',
    confirmContent = 'ra.message.delete_content',
    //@ts-ignore TODO add icon (see below)
    // icon = defaultIcon,
    label = 'ra.action.delete',
    mutationMode = 'pessimistic',
    onClick,
    redirect = 'list',
    translateOptions = {},
    mutationOptions,
    color = 'error',
    //@ts-ignore TODO add to menu item? (see below)
    //...rest
  } = props
  // const translate = useTranslate()
  const record = useRecordContext(props)
  const resource = useResourceContext(props)

  if (!record) return null

  const { open, isLoading, handleDialogOpen, handleDialogClose, handleDelete } =
    useDeleteWithConfirmController({
      record,
      redirect,
      mutationMode,
      onClick,
      mutationOptions,
      resource,
    })

  return (
    <Fragment>
      <MenuItem
        onClick={handleDialogOpen}
        className={clsx('ra-delete-button', className)} //TODO replace with listitem?
        // key="button"
        color={color}
        // {...rest} //TODO: fix put back in
      >
        {/* {icon} //TODO: put in icon */}
        {label}
      </MenuItem>
      <Confirm
        isOpen={open}
        loading={isLoading}
        title={confirmTitle}
        content={confirmContent}
        translateOptions={{ name: '', id: record.id, ...translateOptions }}
        //TODO - once working, replace above with original code below
        // translateOptions={{
        //     name: translate(`resources.${resource}.forcedCaseName`, {
        //         smart_count: 1,
        //         _: inflection.humanize(
        //             translate(`resources.${resource}.name`, {
        //                 smart_count: 1,
        //                 _: inflection.singularize(resource),
        //             }),
        //             true
        //         ),
        //     }),
        // id: record.id,
        //     ...translateOptions,
        // }}
        onConfirm={handleDelete}
        onClose={handleDialogClose}
      />
    </Fragment>
  )
}

// const defaultIcon = <ActionDelete />

export interface DeleteMenuItemProps<
  RecordType extends RaRecord = any,
  MutationOptionsError = unknown,
> extends MenuItemProps {
  confirmTitle?: React.ReactNode
  confirmContent?: React.ReactNode
  icon?: ReactElement
  mutationMode?: MutationMode
  onClick?: ReactEventHandler<any>
  // May be injected by Toolbar - sanitized in MenuItem
  translateOptions?: object
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    DeleteParams<RecordType>
  >
  record?: RecordType
  redirect?: RedirectionSideEffect
  resource?: string
  label?: string
}

// DeleteWithConfirmButton.propTypes = {
//   //replace with DeleteMenuItem.propTypes?
//   className: PropTypes.string,
//   confirmColor: PropTypes.string,
//   confirmTitle: PropTypes.node,
//   confirmContent: PropTypes.node,
//   label: PropTypes.string,
//   mutationMode: PropTypes.oneOf(['pessimistic', 'optimistic', 'undoable']),
//   record: PropTypes.any,
//   redirect: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.bool,
//     PropTypes.func,
//   ]),
//   resource: PropTypes.string,
//   icon: PropTypes.element,
//   translateOptions: PropTypes.object,
// }
