import React from 'react'

import { ReferenceField, TextField, useRecordContext } from 'react-admin'

export const PolymorphicReferenceField = ({ source }) => {
  const record = useRecordContext()

  let refReference = record[`${source}_type`]
  let refSource = `${source}_id`

  if (record[source]) {
    refReference = record[source]['type']
    refSource = `${source}.id`
  }

  console.log(`${refReference} /${refSource}`)

  return (
    <ReferenceField source={refSource} reference={refReference} />
  )
}
