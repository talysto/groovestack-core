// import React from 'react'

import {
  SimpleForm,
  TextInput,
  SimpleShowLayout,
  Create,
  SaveButton,
  useRecordContext,
  CreateButton,
  useNotify,
  Toolbar,
  useRefresh,
} from 'react-admin'
import { PolymorphicReferenceField } from './PolymorphicReferenceField'
import { Avatar, Box, Typography } from '@mui/material'
import { Comment } from '../../mockComments'
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

type Author = {
  id: string;
  type: string;
}

export type CommentCreateProps = {
  authorResolver: () => Author;
  defaultValues?: () => Comment;
}

// const onSuccess = (data) => {
//   notify(`Changes saved`);
//   // redirect(`/posts/${data.id}`);
// };

// import { useForm, FormProvider , useFormState} from "react-hook-form";

// export const CommentCreate = ({authorResolver, defaultValues}: CommentCreateProps) => {
//   const methods = useForm();
//   const onSubmit = data => console.log(data);

//   return (
//     <FormProvider {...methods} > // pass all methods into the context
//       <form onSubmit={methods.handleSubmit(onSubmit)}>
//         <NestedInput />
//         <input type="submit" />
//       </form>
//     </FormProvider>
//   );
// }

// function NestedInput() {
//   const { register } = useFormContext(); // retrieve all hook methods
//   const formContext = useFormContext();
//   console.log("formContextzz = ", formContext)
//   return <input {...register("test")} />;
// }


const PostCreateToolbar = ({setDefaults, defaults}) => {
  const notify = useNotify();
  const formContext = useFormContext();
  // console.log("formContext = ", formContext)
  // const formState = useFormState();
  // console.log("formState = ", formState)

  const refresh = useRefresh();
  return (
      <Toolbar>
          <SaveButton
              type="button"
              label="Comment"
              variant="text"
              mutationOptions={{
                  onSuccess: () => {
                      refresh();
                      formContext.reset();
                      setDefaults(defaults())
                      window.scrollTo(0, 0);
                      notify("changes saved")
                      
                      // notify('ra.notification.created', {
                      //     type: 'info',
                      //     messageArgs: { smart_count: 1 },
                      // });
                  },
              }}
          />
      </Toolbar>
  );
};

const CommentSaveButton = () => {
  // const useFormContext = useFormContext();
  // console.log("reset = ", useFormContext())
  // const { reset } = useFormContext();
  const refresh = useRefresh();


  return (
    <SaveButton mutationOptions={{
      onSuccess: () => {
          // reset();
          window.scrollTo(0, 0);
          refresh();
          // notify("changes saved")
          // notify('ra.notification.created', {
          //     type: 'info',
          //     messageArgs: { smart_count: 1 },
          }
      }} label="Comment" />
  )
}

export const CommentCreate = ({authorResolver, defaultValues}: CommentCreateProps) => {
  const record = useRecordContext()
  const author = authorResolver()
 
  const [defaultz, setDefaults] = useState(defaults());
   // initialize count state to 0
  function defaults() {
    const defaultVals = defaultValues() 
    console.log("running defaults again")
    let newDefault =  Object.assign({
    resource_type: record.type,
    resource_id: record.id,
    author_type: author.type,
    author_id: author.id,
  }, (defaultVals && defaultVals))
  console.log("new default = ", newDefault)  
  return newDefault
}
  return (
    <Create 
      // redirect={false}
      // mutationOptions={}
      // mutationOptions={{ onSuccess }
      resource='Comment'
      sx={{
        '& .RaCreate-card': { boxShadow: 'none' },
        '& .RaCreate-main': { mt: 0 },
      }}
    >
      <SimpleForm toolbar={<PostCreateToolbar setDefaults = {setDefaults} defaults={defaults} />} defaultValues={defaultz}  >
        <body>
          {defaultz.id}
        </body>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Avatar />
          </Box>
          <Box sx={{ flexGrow: 1, m: 1 }}>
            <Typography>Current user name</Typography>
          </Box>
        </Box>
        <TextInput
          source="body"
          multiline
          minRows={2}
          maxRows={6}
          fullWidth
          label="Comment"
        />
        {/* <CreateButton redirect={false} to={{ state: { skipFormReset: true } }} /> */}
        {/* <CommentSaveButton /> */}
      </SimpleForm>
    </Create>
  )
}
// function useFormContext(): { reset: any } {
//   throw new Error('Function not implemented.')
// }

