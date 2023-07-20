import React from 'react'

import { ShowProps, Show, SimpleShowLayout, TextField } from 'react-admin'

import { ChangesTable } from './ChangesTable'
import { PolymorphicReferenceField } from '@moonlight-labs/core-base-fe'

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
      <ChangesTable changesDisplayed={100} />
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
