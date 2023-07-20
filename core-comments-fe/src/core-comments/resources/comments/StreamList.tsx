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
  Button,
} from 'react-admin'

import { CommentCreate, CommentCreateProps } from './Create'
import { AuthorField } from './AuthorField'

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
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          '& .MuiToolbar-root': { p: 1, minHeight: 0 },
        }}
      >
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
        <Button label="Cancel" onClick={() => setToggleEditView(null)} />

        <DeleteWithConfirmButton redirect={false} label="" />
      </Toolbar>
    )
  }

  const EditCommentForm = () => {
    const record = useRecordContext()

    if (record.id === toggleEditView) {
      return (
        <Edit resource="Comment" redirect={false} id={record.id}>
          <SimpleForm
            record={record}
            toolbar={<UpdateCommentToolbar />}
            sx={{ p: 0 }}
          >
            <TextInput
              source="body"
              label={<AuthorField />}
              multiline
              fullWidth
            />
          </SimpleForm>
        </Edit>
      )
    }
    return (
      <WrapperField>
        <AuthorField />
        <TextField component="div" source="body" sx={{ pl: 4 }} />
      </WrapperField>
    )
  }

  return (
    <>
      <CommentCreate />

      <ReferenceManyField
        reference="Comment"
        target="resource_id"
        record={record}
        sort={{ field: 'created_at', order: 'DESC' }}
      >
        <Datagrid
          // rowClick={toggleEdit}
          bulkActionButtons={false}
          sx={{ '& .RaDatagrid-rowCell': { p: 1, mb: 2 } }}
        >
          <EditCommentForm />
        </Datagrid>
      </ReferenceManyField>
    </>
  )
}
