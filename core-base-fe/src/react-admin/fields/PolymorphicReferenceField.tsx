import { FieldProps, ReferenceField, useRecordContext } from 'react-admin'

export interface PolymorphicReferenceFieldProps extends FieldProps {
  source: string
}

/**
 * React Admin Field that renders a Rails-style polymorphic relationship
 *
 * @component
 * @example
 * return (
 *   <PolymorphicReferenceField source='author' />
 * )
 */
export const PolymorphicReferenceField = ({
  source,
}: PolymorphicReferenceFieldProps) => {
  const record = useRecordContext()

  if (!record) return null

  let refReference = record[`${source}_type`]
  let refSource = `${source}_id`

  if (record[source]) {
    refReference = record[source]['type']
    refSource = `${source}.id`
  }

  return <ReferenceField source={refSource} reference={refReference} sx={{'& a': { textDecoration: 'none' }}}/>
}
