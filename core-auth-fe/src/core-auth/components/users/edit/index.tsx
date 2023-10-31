import { Toolbar, Typography } from '@mui/material'
import {
  Edit,
  SaveButton,
  SimpleForm,
  TabbedForm,
  useRefresh,
} from 'react-admin'

import { StandardTitle } from '../../shared/StandardTitle'
import { Aside } from '../Aside'
// import { NotificationSettings } from './NotificationSettings'
import { AvatarUpload } from './AvatarUpload'
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
          <Typography variant="h6">Avatar</Typography>
          <AvatarUpload />
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
