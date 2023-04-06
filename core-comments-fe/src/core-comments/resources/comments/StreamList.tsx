import React from 'react'

import {
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  ReferenceManyField,
  TextField,
  WrapperField,
  useRecordContext,
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
      alignItems: 'center', 
      "&:hover .showDelete": {
        display: 'block'
      }
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
      <Box className={'showDelete'} sx={{
        display: 'none'
      }}>
        <DeleteWithConfirmButton label="" sx={{ paddingLeft: '14px', marginRight: '15px' }} />
      </Box>
    </Box>
  )
}

type CommentStreamProps = {
  createProps: CommentCreateProps
}

export const CommentStream = ({ createProps }: CommentStreamProps) => {
  const record = useRecordContext()
  
  return (
    <>
      <Comments.Create {...createProps} />

      <ReferenceManyField
        reference="Comment"
        target="resource_id"
        record={record}
        sort={{ field: 'created_at', order: 'DESC' }}
      >
        <Datagrid bulkActionButtons={false} sx={{
          '& .RaDatagrid-rowCell': {
              padding: 0,
              paddingBottom: '5px',
              paddingTop: '5px'
          },
        }}>
          <WrapperField>
            <AuthorField />
            <Typography>
              <TextField source="body" />
            </Typography>
          </WrapperField>
        </Datagrid>
      </ReferenceManyField>
    </>
  )
}
