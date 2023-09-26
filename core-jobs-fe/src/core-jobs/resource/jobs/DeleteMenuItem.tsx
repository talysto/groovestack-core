import ActionDelete from '@mui/icons-material/Delete'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { Fragment, ReactElement, ReactEventHandler } from 'react'
// import inflection from 'inflection';
import { ListItem, ListItemProps } from '@mui/material'
import {
  Confirm,
  DeleteParams,
  DeleteWithConfirmButton,
  MutationMode,
  RaRecord,
  RedirectionSideEffect,
  useDeleteWithConfirmController,
  useRecordContext,
  useResourceContext,
  useTranslate,
} from 'react-admin'
import { UseMutationOptions } from 'react-query'
// import { Confirm } from '../layout';
// import { Button, ButtonProps } from './Button';

export const DeleteMenuItem = <RecordType extends RaRecord = any>(
  props: DeleteMenuItemProps<RecordType>,
) => {
  const {
    className,
    confirmTitle = 'ra.message.delete_title',
    confirmContent = 'ra.message.delete_content',
    icon = defaultIcon,
    label = 'ra.action.delete',
    mutationMode = 'pessimistic',
    onClick,
    redirect = 'list',
    translateOptions = {},
    mutationOptions,
    color = 'error',
    ...rest
  } = props
  const translate = useTranslate()
  const record = useRecordContext(props)
  const resource = useResourceContext(props)

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
      <ListItem
        onClick={handleDialogOpen}
        className={clsx('ra-delete-button', className)} //TODO replace with listitem?
        // key="button"
        color={color}
        // {...rest} //TODO: fix put back in
      >
        {/* {icon} //TODO: put in icon */}
        {label}
      </ListItem>
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

const defaultIcon = <ActionDelete />

export interface DeleteMenuItemProps<
  RecordType extends RaRecord = any,
  MutationOptionsError = unknown,
> extends ListItemProps {
  confirmTitle?: React.ReactNode
  confirmContent?: React.ReactNode
  icon?: ReactElement
  mutationMode?: MutationMode
  onClick?: ReactEventHandler<any>
  // May be injected by Toolbar - sanitized in ListItem
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

DeleteWithConfirmButton.propTypes = {
  //replace with DeleteMenuItem.propTypes?
  className: PropTypes.string,
  confirmTitle: PropTypes.node,
  confirmContent: PropTypes.node,
  label: PropTypes.string,
  mutationMode: PropTypes.oneOf(['pessimistic', 'optimistic', 'undoable']),
  record: PropTypes.any,
  redirect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
  ]),
  resource: PropTypes.string,
  icon: PropTypes.element,
  translateOptions: PropTypes.object,
}
