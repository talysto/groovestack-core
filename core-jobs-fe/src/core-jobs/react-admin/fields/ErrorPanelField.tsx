import { CodeField } from '@groovestack/base'
import {
  FieldProps,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from 'react-admin'

export const ErrorPanelField = (_props: Omit<FieldProps, 'source'>) => {
  const record = useRecordContext()

  if (!record || !record.error_count) return null

  return (
    <SimpleShowLayout>
      <TextField source="error_count" />
      <TextField source="last_error_message" />
      <CodeField source="last_error_backtrace" />
    </SimpleShowLayout>
  )
}
