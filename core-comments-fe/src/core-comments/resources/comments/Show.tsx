import React from 'react'

import { ShowProps, Show, SimpleShowLayout, TextField } from 'react-admin'

import { CoreBase } from '@moonlight-labs/core-base-fe'
const PolymorphicReferenceField = CoreBase.PolymorphicReferenceField

const CommentsTitle = (props: any) => {
  const { record } = props
  return record ? <span>{'Comments'}</span> : null
}

type CommentsShowProps = ShowProps & {
  showLayoutWrapper?: {
    component: any
    props: { [key: string]: any }
  }
}

export const CommentShow: React.FC<CommentsShowProps> = ({
  showLayoutWrapper = { component: null, props: null },
  ...props
}) => {
  const renderLayout = () => (
    <SimpleShowLayout>
      <TextField source="id" />
      <PolymorphicReferenceField source="author" />
      <PolymorphicReferenceField source="resource" />
      <TextField source="body" sx={{ width: 350 }} />
    </SimpleShowLayout>
  )

  const { component: WrapperComponent, props: wrapperProps } = showLayoutWrapper

  return (
    <Show title={<CommentsTitle />} {...props}>
      {!!WrapperComponent ? (
        <WrapperComponent {...wrapperProps}>{renderLayout()}</WrapperComponent>
      ) : (
        <>{renderLayout()}</>
      )}
    </Show>
  )
}
