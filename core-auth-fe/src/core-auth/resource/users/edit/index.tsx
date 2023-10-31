import { Toolbar, Typography } from '@mui/material'
import {
  Edit,
  SaveButton,
  SimpleForm,
  TabbedForm,
  useRefresh,
} from 'react-admin'

import { StandardTitle } from '../../../components/StandardTitle'
import { Aside } from '../../../components/Aside'
// import { NotificationSettings } from './NotificationSettings'
import { GeneralSettings } from './GeneralSettings'

const EditToolbar = () => (
  <Toolbar>
    {/* no Delete */}
    <SaveButton />
  </Toolbar>
)

export const UserEdit = () => {
  const refresh = useRefresh()

  return (
    <Edit
      aside={<Aside />}
      title={<StandardTitle />}
      // actions={<TopToolbar actions={<ShowButton />} />}
      redirect={false}
      mutationMode="pessimistic"
      mutationOptions={{ onSuccess: refresh }}
    >
      <TabbedForm sanitizeEmptyValues toolbar={<EditToolbar />}>
        <TabbedForm.Tab label="preferences">
          <GeneralSettings />
        </TabbedForm.Tab>

        <TabbedForm.Tab label="security">
          <Edit>
            <SimpleForm>{/* <SecuritySettings /> */}</SimpleForm>
          </Edit>
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  )
}
