import React from 'react'

import { ReferenceField } from "react-admin";

const ResourceDisplay: React.FC<{ record?: any, type: string }> = ({ record, type }) => {
  if (!record) return null

  const display = record.toS || `${type} (${record.id.slice(0, 6)})`
  const [header, subheader] = display.split("::")
  return (
    <span>
      <div>{header}</div>
      {subheader && <div><small>{subheader}</small></div>}
    </span>
  )
}

export const ResourceField = (props: any) => {
  const { record } = props;
  const reference = `admin/${record.resourceType.toLowerCase()}`
  return (
    <ReferenceField record={record} source="resourceId" reference={reference}>
      <ResourceDisplay type={record.resourceType} />
    </ReferenceField>
  )
}