import {
  FieldProps,
  ReferenceField,
  useRecordContext,
} from 'react-admin'

export interface PolymorphicReferenceFieldProps extends FieldProps {
  source: string
}

export const PolymorphicReferenceField = ({
  source,
}: PolymorphicReferenceFieldProps) => {
  const record = useRecordContext()

  let refReference = record[`${source}_type`]
  let refSource = `${source}_id`

  if (record[source]) {
    refReference = record[source]['type']
    refSource = `${source}.id`
  }

  return <ReferenceField source={refSource} reference={refReference} />
}
