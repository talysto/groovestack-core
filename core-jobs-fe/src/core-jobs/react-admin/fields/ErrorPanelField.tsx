import {
  FieldProps,
  SimpleShowLayout,
  TextField,
  useRecordContext
} from 'react-admin';
import { CodeField } from '@moonlight-labs/core-base-fe';

export const ErrorPanelField = (props: FieldProps) => {
  const record = useRecordContext();

  if (!record || !record.error_count)
    return null;

  return (
    <SimpleShowLayout>
      <TextField source="error_count" />
      <TextField source="last_error_message" />
      <CodeField source="last_error_backtrace" />
    </SimpleShowLayout>
  );
};
