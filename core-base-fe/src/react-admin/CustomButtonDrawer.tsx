import {
  EditOutlined as EditOutlinedIcon,
  HighlightOffOutlined as HighlightOffOutlinedIcon,
} from '@mui/icons-material'
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  DrawerProps,
  IconButton,
} from '@mui/material'
import { useState } from 'react'
import {
  Button,
  ButtonProps,
  Create,
  CreateProps,
  EditProps,
  Edit,
  RecordContextProvider,
  useEditContext,
  useNotify,
  useRecordContext,
  useRefresh,
  useResourceContext,
} from 'react-admin'

export type ButtonDrawerProps = {
  mode: 'static' | 'create' | 'edit'
  children: React.ReactNode
  drawerProps: {
    title?: string | React.ReactNode
  } & DrawerProps & { onSuccess?: () => void }
  createProps?: CreateProps
  editProps?: EditProps
  buttonProps?: ButtonProps
  drawerWidth?: DrawerWidth
  footer?: React.ReactNode
  label?: string
  icon?: React.ReactElement;
}

export type CustomDrawerProps = {
  mode?: 'static' | 'create' | 'edit'
  children: ButtonDrawerProps['children']
  open: boolean
  editProps?: EditProps
  createProps?: CreateProps
  drawerWidth: DrawerWidth
  onClose: () => void
  title?: ButtonDrawerProps['drawerProps']['title']
  onSuccess?: () => void
  footer?: React.ReactNode
}

export enum DrawerWidth {
  // ExtraSmall
  Small = '30%',
  Medium = '50%',
  Large = '80%',
}

export const CustomButtonDrawer = ({
  mode = 'static',
  icon = <EditOutlinedIcon />,
  drawerProps,
  createProps,
  editProps,
  buttonProps,
  children,
  drawerWidth = DrawerWidth.Small,
  label,
  footer,
}: ButtonDrawerProps) => {
  const [open, setOpen] = useState(false)

  const closeDrawer = () => setOpen(false)
  const openDrawer = () => setOpen(true)

  return (
    <>
      <Button
        // startIcon={icon}
        label={label || 'Edit'}
        onClick={openDrawer}
        {...buttonProps}
        //TODO turn off label without changing name? maybe drop in MUI button?
      >{icon}</Button>
      <CustomDrawer
        mode={mode}
        open={open}
        drawerWidth={drawerWidth}
        {...drawerProps}
        onClose={closeDrawer}
        footer={footer}
        createProps={createProps}
        editProps={editProps}
      >
        {children}
      </CustomDrawer>
    </>
  )
}

const CustomDrawer = ({
  children,
  open,
  onClose,
  onSuccess: customOnSuccess,
  title,
  mode,
  drawerWidth,
  footer,
  editProps,
  createProps,
  ...drawerProps
}: CustomDrawerProps) => {
  const notify = useNotify()
  const refresh = useRefresh()
  const record = useRecordContext()
  const e = useEditContext()
  const resource = useResourceContext()

  // console.log('Record', record)
  // console.log('Resource', resource)
  // console.log('Mode', mode)

  const onCreateSuccessDefault = () => {
    refresh()
    notify('Resource Created!', { type: 'success' })
  }

  const onEditSuccessDefault = () => {
    notify('Changes Saved', { type: 'success' })
  }

  const onSuccess = () => {
    if (customOnSuccess) customOnSuccess()
    else if (mode == 'create') onCreateSuccessDefault()
    else if (mode == 'edit') onEditSuccessDefault()

    onClose()
  }

  // function renderWrapper() {
  //   if (mode === 'create') return (
  //     <Edit
  //       mutationMode="pessimistic"
  //       mutationOptions={{ onSuccess: onSuccess || onEditSuccessDefault }}
  //       resource={resource}
  //       redirect={false}
  //       id={record.id}
  //       sx={{ '& .RaEdit-noActions': { mt: '3px' } }}
  //       actions={false}
  //     >
  //       {children}
  //     </Edit>
  //   )

  //   if (mode == 'edit') return (
  //       <Create
  //             resource={resource}
  //             redirect={false}
  //             mutationOptions={{ onSuccess: onSuccess || onCreateSuccessDefault }}
  //           >
  //             {children}
  //           </Create>
  //   )

  //   return <>{children}</>
  // }
  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: drawerWidth } } }}
      {...drawerProps}
    >
      <DialogTitle>
        {title}
        <IconButton
          aria-label="Close"
          sx={{ position: 'absolute', right: 0, top: 0 }}
          onClick={onClose}
        >
          <HighlightOffOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {mode == 'static' && children}
        {mode == 'create' && (
          <Create
            resource={resource}
            redirect={false}
            mutationOptions={{ onSuccess }}
            {...createProps}
          >
            <RecordContextProvider value={record}>
              {children}
            </RecordContextProvider>
          </Create>
        )}
        {mode == 'edit' && (
          <Edit
            mutationMode="pessimistic"
            mutationOptions={{ onSuccess }}
            resource={resource}
            redirect={false}
            id={record.id}
            sx={{ '& .RaEdit-noActions': { mt: '3px' } }}
            actions={false}
            {...editProps}
            
          >
            {children}
          </Edit>
        )}
      </DialogContent>
      <DialogActions>{footer}</DialogActions>
    </Drawer>
  )
}
