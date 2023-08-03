// import { useState } from 'react'

// import {
//   Button,
//   DeleteWithConfirmButton,
//   Edit,
//   Identifier,
//   RaRecord,
//   RowClickFunction,
//   SaveButton,
//   SimpleForm,
//   TextField,
//   TextInput,
//   Toolbar,
//   WrapperField,
//   useRecordContext,
//   useRedirect,
// } from 'react-admin'

// import { Box } from '@mui/material'
// import { CommentsTable } from './CommentsTable'
// import { CommentCreate, CommentCreateProps } from './Create'
// import { AuthorField } from './Fields'

// type CommentStreamProps = {
//   createProps?: CommentCreateProps
// }

// export const CommentStream = ({ createProps }: CommentStreamProps) => {
//   const record = useRecordContext()

//   const [toggleEditView, setToggleEditView] = useState<any>(null)

//   const toggleEdit: RowClickFunction = (
//     id: Identifier,
//     resource: string,
//     record: RaRecord,
//   ) => {
//     setToggleEditView(id)

//     return false
//   }

//   const UpdateCommentToolbar = () => {
//     const redirect = useRedirect()

//     return (
//       <Toolbar
//         sx={{
//           justifyContent: 'space-between',
//           '& .MuiToolbar-root': { p: 1, minHeight: 0 },
//         }}
//       >
//         <SaveButton
//           type="button"
//           label="Update"
//           mutationOptions={{
//             onSuccess: () => {
//               setToggleEditView(null)
//               redirect(false)
//             },
//           }}
//         />
//         <Button label="Cancel" onClick={() => setToggleEditView(null)} />

//         <DeleteWithConfirmButton redirect={false} label="" />
//       </Toolbar>
//     )
//   }

//   const EditCommentForm = () => {
//     const record = useRecordContext()

//     if (record.id === toggleEditView) {
//       return (
//         <Edit resource="Comment" redirect={false} id={record.id}>
//           <SimpleForm
//             record={record}
//             toolbar={<UpdateCommentToolbar />}
//             sx={{ p: 0 }}
//           >
//             <TextInput
//               source="body"
//               label={<AuthorField />}
//               multiline
//               fullWidth
//             />
//           </SimpleForm>
//         </Edit>
//       )
//     }
//     return (
//       <WrapperField>
//         <AuthorField />
//         <TextField component="div" source="body" sx={{ pl: 4 }} />
//       </WrapperField>
//     )
//   }

//   return (
//     <Box sx={{ maxHeight: 400, overflow: 'scroll' }}>
//       <CommentCreate />

//       <CommentsTable
//         infinite
//         listProps={{ exporter: false, children: null }}
//         datagridProps={{ bulkActionButtons: false }}
//       >
//         <EditCommentForm />
//       </CommentsTable>

//       {/*
//         <Datagrid
//           sx={{ '& .RaDatagrid-rowCell': { p: 1, mb: 2 } }}
//       */}
//     </Box>
//   )
// }
