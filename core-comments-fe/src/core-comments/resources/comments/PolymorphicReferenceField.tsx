import React from 'react'

import { PublicFieldProps, ReferenceField, TextField, useRecordContext } from 'react-admin'

interface PolymorphicReferenceFieldProps extends PublicFieldProps {
  source: string
}

export const PolymorphicReferenceField = ({ source } : PolymorphicReferenceFieldProps)  => {

  const record = useRecordContext()

  let refReference = record[`${source}_type`]
  let refSource = `${source}_id`

  if (record[source]) {
    refReference = record[source]['type']
    refSource = `${source}.id`
  }

  return (
    <ReferenceField source={refSource} reference={refReference} />
  )
}
