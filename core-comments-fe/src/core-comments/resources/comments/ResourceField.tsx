import React from 'react'

import { ReferenceField, TextField, useRecordContext } from "react-admin";

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

export const ResourceField = ({ source }) => {
  const record = useRecordContext()
  console.log(record[source])

  // const reference = `admin/${record.type.toLowerCase()}`
  const reference = record[source]['type']

  return (
    <ReferenceField source={record[source]['id']} reference={record[source]['type']}>

      <TextField source="name" />
      {/* <ResourceDisplay type={record.type} /> */}

    </ReferenceField>
  )
}