import React from 'react'

import { useRecordContext } from 'react-admin'

export const MoneyField: React.FC<{ source: string }> = ({ source }) => {
  const record = useRecordContext()

  if (!record) return null

  return (
    <span>
      {record[source].formatted_amount} {record[source].currency.code}
    </span>
  )
}
