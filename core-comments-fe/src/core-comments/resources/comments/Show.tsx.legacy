import { Show, ShowProps, SimpleShowLayout, TextField } from 'react-admin'

import { PolymorphicReferenceField } from '@moonlight-labs/core-base-fe'

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

export const CommentShow = ({
  showLayoutWrapper = { component: null, props: {} },
  ...props
}: CommentsShowProps) => {
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
