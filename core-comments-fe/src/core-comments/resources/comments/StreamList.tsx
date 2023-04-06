import React, { useState } from 'react'

import {
  Datagrid,
  DeleteWithConfirmButton,
  ReferenceManyField,
  TextField,
  TextInput,
  WrapperField,
  Edit,
  Toolbar,
  useRedirect,
  SaveButton,
  useRecordContext,
  SimpleForm
} from 'react-admin'

import { PolymorphicReferenceField } from './PolymorphicReferenceField'
import { Typography, Avatar, Box } from '@mui/material'
import { Comments } from '.'
import { CommentCreateProps } from './Create'
import { CoreBase } from '../../../../../core-base-fe/src/core-base'

const CoreDateField = CoreBase.CoreDateField

const AuthorField = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center'
    }}>
      <Box>
        <Avatar />
      </Box>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Typography>
          <PolymorphicReferenceField source="author" />
        </Typography>
        <Typography>
          <CoreDateField source='created_at' showTime={false} />
        </Typography>
      </Box>
    </Box>
  )
}

type CommentStreamProps = {
  createProps: CommentCreateProps
}

export const CommentStream = ({ createProps }: CommentStreamProps) => {
  const record = useRecordContext()

  const [toggleEditView, setToggleEditView] = useState<any>(null)

  const toggleEdit = (id: any, resource: any, record: any) => {
    setToggleEditView(id)
    
    return false
  }

  const UpdateCommentToolbar = () => {
    const redirect = useRedirect()
  
    return (
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      <SaveButton
        type="button"
        label="Update"
        mutationOptions={{
          onSuccess: () => {
            setToggleEditView(null)
            redirect(false)
          },
        }}
      />
      <DeleteWithConfirmButton label="" sx={{ paddingLeft: '14px' }} />
    </Toolbar>
    );
  };

  const EditCommentForm = () => {
    const record = useRecordContext()
  
    if (record.id === toggleEditView) {
      return (
        <Edit redirect={false} id={record.id}>
          <SimpleForm toolbar={<UpdateCommentToolbar />}>
            <AuthorField />
            <TextInput source="body" multiline sx={{ width: 350 }}/>
          </SimpleForm>
        </Edit>
      )
    }
    return (
      <WrapperField>
        <AuthorField />
        <Typography>
          <TextField source="body" />
        </Typography>
      </WrapperField>
    )
  }

  return (
    <>
      <Comments.Create {...createProps} recordProp={record} />

      <ReferenceManyField
        reference="Comment"
        target="resource_id"
        record={record}
        sort={{ field: 'created_at', order: 'DESC' }}
      >
        <Datagrid rowClick={toggleEdit} bulkActionButtons={false} sx={{
          '& .RaDatagrid-rowCell': {
              padding: '5px'
          },
        }}>
          <EditCommentForm />
        </Datagrid>
      </ReferenceManyField>
    </>
  )
}
