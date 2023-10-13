import { PolymorphicReferenceField } from '@moonlight-labs/core-base-fe'
import {
  DateField,
  DateInput,
  Edit,
  FunctionField,
  NumberField,
  RaRecord,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'

export const NotificationEdit = () => (
  <Edit>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <DateField source="created_at" showTime />
      <TextField source="kind" />
      <PolymorphicReferenceField source="to" />
      <FunctionField
        label="Read"
        render={(record: RaRecord) => {
          if (!record.read) return null
          
          return Number.isInteger(record.read) ? (
            <NumberField source="read" />
          ) : (
            record.read && <>TRUE</>
          )
        }}
      />
    </SimpleShowLayout>

    <SimpleForm>
      <TextInput source="title" fullWidth />
      <TextInput source="description" multiline fullWidth />
      <TextInput source="link" fullWidth />
      <TextInput source="actions" fullWidth />

      {/* <ChipInput source="status" /> */}
      <DateInput source="publish_at" />
      <DateInput source="expire_at" />
    </SimpleForm>
  </Edit>
)
