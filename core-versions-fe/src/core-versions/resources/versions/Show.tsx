import React from 'react'

import { ShowProps, Show, SimpleShowLayout, TextField } from 'react-admin'
import { PolymorphicReferenceField } from './PolymorphicReferenceField'

const VersionsTitle = (props: any) => {
  const { record } = props
  return record ? <span>{'Versions'}</span> : null
}

type VersionsShowProps = ShowProps & {
  showLayoutWrapper?: {
    component: any
    props: { [key: string]: any }
  }
}

export const VersionShow: React.FC<VersionsShowProps> = ({
  showLayoutWrapper = { component: null, props: null },
  ...props
}) => {
  const renderLayout = () => (
    <SimpleShowLayout>
      <TextField source="id" />
      <PolymorphicReferenceField source="actor" />
      <PolymorphicReferenceField source="resource" />
      <TextField source="changes" />  /
      <TextField source="timestamp" />
    </SimpleShowLayout>
  )

  const { component: WrapperComponent, props: wrapperProps } = showLayoutWrapper

  return (
    <Show title={<VersionsTitle />} {...props}>
      {!!WrapperComponent ? (
        <WrapperComponent {...wrapperProps}>{renderLayout()}</WrapperComponent>
      ) : (
        <>{renderLayout()}</>
      )}
    </Show>
  )
}
