import { useState } from 'react'

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
  SimpleForm,
  RowClickFunction,
  RaRecord,
  Identifier,
} from 'react-admin'

import { Typography, Avatar, Box } from '@mui/material'

// import { Comments } from '.'
import { CommentCreateProps } from './Create'
import { PolymorphicReferenceField, DateField } from '@moonlight-labs/core-base-fe'

const AuthorField = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box>
        <Avatar />
      </Box>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Typography>
          <PolymorphicReferenceField source="author" />
        </Typography>
        <Typography>
          <DateField source="created_at" showTime={false} />
        </Typography>
      </Box>
    </Box>
  )
}

type CommentStreamProps = {
  createProps?: CommentCreateProps
}

export const CommentStream = ({ createProps }: CommentStreamProps) => {
  const record = useRecordContext()

  const [toggleEditView, setToggleEditView] = useState<any>(null)

  const toggleEdit: RowClickFunction = (
    id: Identifier,
    resource: string,
    record: RaRecord,
  ) => {
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
        <DeleteWithConfirmButton
          redirect={false}
          label=""
          sx={{ paddingLeft: '14px' }}
        />
      </Toolbar>
    )
  }

  const EditCommentForm = () => {
    const record = useRecordContext()

    if (record.id === toggleEditView) {
      return (
        <Edit resource="Comment" redirect={false} id={record.id}>
          <SimpleForm record={record} toolbar={<UpdateCommentToolbar />}>
            <AuthorField />
            <TextInput source="body" multiline sx={{ width: 350 }} />
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
      {/* {createProps && <Comments.Create {...createProps} /> } */}

      <ReferenceManyField
        reference="Comment"
        target="resource_id"
        record={record}
        sort={{ field: 'created_at', order: 'DESC' }}
      >
        <Datagrid
          rowClick={toggleEdit}
          bulkActionButtons={false}
          sx={{
            '& .RaDatagrid-rowCell': {
              padding: '5px',
            },
          }}
        >
          <EditCommentForm />
        </Datagrid>
      </ReferenceManyField>
    </>
  )
}
