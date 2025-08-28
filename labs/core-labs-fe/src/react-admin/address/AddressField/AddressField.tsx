import {
  TextField,
  TextFieldProps,
  WrapperField,
} from 'react-admin'

export interface AddressFieldProps extends TextFieldProps {
  format?: 'singleline' | 'multiline' | 'stacked'
  // labelComponents?: boolean
}

/**
 * AddressField is a React Admin field that displays an address with a
 * a variety of formatting options.
 *
 *  FEATURES
 * - source can be string or object
 * - various formatting options: single line, multiline, etc
 * -
 *
 */
export const AddressField = ({
  format = 'singleline',
  // labelComponents = false,
  ...rest
}: AddressFieldProps) => {
  const address = '123 Main St' // TODO _.get(record, rest.source)

  if (!address) return null

  if (typeof address === 'string') return <TextField {...rest} />

  return (
    <WrapperField source='Address'>
      {/* <Stack direction="row" spacing={1}> */}
      <TextField
        {...rest}
        source={`${rest.source}.street`}
        {...(format != 'singleline' && { sx: { display: 'block' } })}
      />
      <TextField
        {...rest}
        source={`${rest.source}.city`}
        {...(format == 'stacked' && { sx: { display: 'block' } })}
      />
      <TextField
        {...rest}
        source={`${rest.source}.state`}
        {...(format == 'stacked' && { sx: { display: 'block' } })}
      />
      <TextField
        {...rest}
        source={`${rest.source}.zip`}
        {...(format == 'stacked' && { sx: { display: 'block' } })}
      />
      <TextField
        {...rest}
        source={`${rest.source}.country`}
        {...(format == 'stacked' && { sx: { display: 'block' } })}
      />
      {/* </Stack> */}
    </WrapperField>
  )
}
