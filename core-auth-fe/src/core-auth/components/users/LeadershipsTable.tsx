import {
  ChipField,
  Datagrid,
  List,
  ReferenceField,
  TextField,
  useRecordContext,
} from 'react-admin'

export const LeadershipsTable = () => {
  const user = useRecordContext()

  return (
    <List
      resource="Leadership"
      filter={user && { user_id: user.id }}
      actions={false}
    >
      <Datagrid bulkActionButtons={false}>
        <ReferenceField source="org_unit_id" reference="OrgUnit" link="show">
          <TextField source="name" label="Org" />
        </ReferenceField>
        <ReferenceField source="leadership_position_id" reference="Lookup">
          <TextField source="name" label="Position" />
        </ReferenceField>
        <ChipField source="status" size="small" />
        <ReferenceField source="invited_by_id" reference="User">
          <TextField source="name" label="Invited By" />
        </ReferenceField>
      </Datagrid>
    </List>
  )
}
