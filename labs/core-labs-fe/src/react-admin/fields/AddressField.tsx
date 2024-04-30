import { Typography } from '@mui/material'
import { FieldProps, useRecordContext } from 'react-admin'

export const AddressField = (_props: FieldProps) => {
  const record = useRecordContext()
  if (!record?.address) return null

  const splitAddressArr = record.address.split(',')
  const addr1 = splitAddressArr[0]
  const addr2 = splitAddressArr.slice(1).join(',')

  return (
    <Typography variant="body2" component="span">
      <div>{addr1}</div>
      <div>{addr2}</div>
    </Typography>
  )
}
