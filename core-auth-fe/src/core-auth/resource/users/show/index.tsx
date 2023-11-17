import {
  CheckboxGroupInput,
  DateField,
  Edit,
  EditProps,
  Labeled,
  SaveButton,
  Show,
  SimpleForm,
  TabProps,
  TabbedShowLayout,
  TextField,
  TextInput,
  Title,
  Toolbar,
  useGetIdentity,
  useRecordContext,
} from 'react-admin'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import SettingsIcon from '@mui/icons-material/TuneOutlined'
import { Typography } from '@mui/material'

import { IdentitiesTable } from '../../identities/table'
import { StandardTitle } from '../../../components/StandardTitle'
import { TopToolbar } from '../../../components/TopToolbar'
import SettingsTabs from '../../../components/SettingsTabs'
import { SecuritySettings } from './SecuritySettings'

// TODO: grab user roles from lookups, not default app config
import { defaultCredentials } from '../../../credentials'

export function titleCase(str: string): string {
  return str
    .split(' ')
    .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

const DefaultToolbar = (props: any) => (
  <Toolbar {...props} sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <SaveButton />
  </Toolbar>
)

const GeneralSettings = () => (
  <SimpleForm warnWhenUnsavedChanges toolbar={<DefaultToolbar />}>
    <TextInput source="name" fullWidth />
    <TextInput source="email" type="email" fullWidth />
    <TextInput disabled source="image" fullWidth />
  </SimpleForm>
)

const AdminUserMetaAside = () => {
  return (
    <div style={{ width: '30%', margin: '1em', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6">General</Typography>
      <Labeled label="Last Login At">
        <DateField source="last_login_at" />
      </Labeled>
      <Labeled label="Sign In Count">
        <TextField source="sign_in_count" />
      </Labeled>
    </div>
  )
}

const PreferencesTab = () => {
  const DefaultEditProps: EditProps = {
    redirect: false,
    actions: false,
    title: ' ', // don't override titles
  }

  const settingsConfig = [
    {
      title: 'General',
      groups: [
        {
          description: 'Your basic account information.',
          component: (
            <Edit {...DefaultEditProps}>
              <GeneralSettings />
            </Edit>
          ),
        },
      ],
    },
    {
      title: 'Security',
      groups: [
        {
          label: 'Social Logins',
          description: 'Connect social accounts to enable single sign-on',
          component: <IdentitiesTable />,
        },
        {
          label: 'Password',
          description: 'Add or update your password',
          component: (
            <Edit {...DefaultEditProps}>
              <SecuritySettings toolbar={<DefaultToolbar />} />
            </Edit>
          ),
        }
      ],
    },
  ]

  return (
    <>
      <Title title={<StandardTitle />} />
      <SettingsTabs settings={settingsConfig} />
    </>
  )
}


const AdminTab = () => {
  const roles = defaultCredentials.getAppConfig().user_roles.map((role: string) => ({ id: role, name: titleCase(role) }))

  return (
    <Edit 
      title={<StandardTitle />}
      aside={<AdminUserMetaAside />} 
      actions={false} 
      redirect={false}
    >
      <SimpleForm toolbar={<DefaultToolbar />}>
        <Typography variant="h6">User Management</Typography>
        <CheckboxGroupInput
          source="roles"
          choices={roles}
        />
      </SimpleForm>
    </Edit>
  )
}

interface TabConfig {
  label: string
  component: JSX.Element
  displayIf?: (user: any) => boolean
  icon?: any
}

const UserTabs = () => {
  const record = useRecordContext()
  const { data: currentUser } = useGetIdentity()

  if (!(record && currentUser)) return <div>Loading...</div>

  const tabsConfig: Array<TabConfig> = [
    {
      label: 'Preferences',
      icon: SettingsIcon,
      component: <PreferencesTab />,
    },
    {
      label: 'Admin',
      icon: AdminPanelSettingsIcon,
      component: <AdminTab />,
      displayIf: (currentUser: any) => currentUser?.roles?.includes('admin'),
    },
  ]

  const tabs = tabsConfig.filter(
    (tab) => !tab.displayIf || tab.displayIf(currentUser),
  )

  return (
    <TabbedShowLayout
      sx={{ '& .RaTabbedShowLayout-content': { p: { xs: 0 }, pt: { md: 1 } } }}
    >
      {tabs.map((tab, idx) => {
        const props = {
          key: idx,
          label: tab.label,
          sx: {
            minWidth: 0,
            p: 1,
            '& .MuiTab-iconWrapper': { mr: { xs: 0, sm: 1 } },
          },
          iconPosition: 'start',
        } as unknown as TabProps

        if (tab.icon) props.icon = <tab.icon />

        if (idx > 0) props.path = tab.label.toLowerCase()

        return (
          <TabbedShowLayout.Tab {...props}>
            {tab.component}
          </TabbedShowLayout.Tab>
        )
      })}
    </TabbedShowLayout>
  )
}
export const UserShow = () => (
  <Show 
    title={<></>} // underlying tab edit component will set title
    actions={<TopToolbar actions={false} />}
  >
    <UserTabs />
  </Show>
)
