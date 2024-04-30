import {
  CheckboxGroupInput,
  DateField,
  Edit,
  EditProps,
  Labeled,
  SaveButton,
  Show,
  SimpleForm,
  SimpleShowLayout,
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
import { Grid, Typography } from '@mui/material'

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

export const GeneralSettings = ({ imgInput }: { imgInput?: React.ReactNode }) => (
  <SimpleForm warnWhenUnsavedChanges toolbar={<DefaultToolbar />}>
    {imgInput}
    <TextInput source="name" fullWidth />
    <TextInput source="email" type="email" fullWidth />
    {!imgInput && <TextInput disabled source="image" fullWidth />}
  </SimpleForm>
)

export const inlineLayout = {
  '& .RaLabeled-label': {
    display: 'inline-block',
    minWidth: 70,
    mr: 1,
    textTransform: 'uppercase',
  },
}

const AdminUserMeta = () => {
  return (
    <SimpleShowLayout sx={{ ...inlineLayout }}>
      <DateField noWrap source="last_login_at" />
      <TextField noWrap source="sign_in_count" />
    </SimpleShowLayout>
  )
}

const DefaultEditProps: EditProps = {
  redirect: false,
  actions: false,
  title: ' ', // don't override titles
}

interface PreferencesSettingConfig {
  title: string;
  groups: {
      key: string;
      label?: string;
      description: string;
      component: JSX.Element;
  }[];
}

export const PreferencesSettingsConfig: PreferencesSettingConfig[] = [
  {
    title: 'General',
    groups: [
      {
        key: 'basic_info',
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
        key: 'identities',
        label: 'Social Logins',
        description: 'Connect social accounts to enable single sign-on',
        component: <IdentitiesTable />,
      },
      {
        key: 'password',
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

export const PreferencesTab = ({ settingsConfig=PreferencesSettingsConfig }: { settingsConfig?: PreferencesSettingConfig[] }) => {
  

  return (
    <>
      <Title title={<StandardTitle />} />
      <SettingsTabs settings={settingsConfig} />
    </>
  )
}

const AdminTabAside = () => (
  <>
    <Typography variant="h6">Metadata</Typography>
    <AdminUserMeta />
  </>
)

export const AdminTab = ({ aside=<AdminTabAside /> }: { aside?: React.ReactNode }) => {
  const roles = defaultCredentials.getAppConfig().user_roles.map((role: string) => ({ id: role, name: titleCase(role) }))

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Edit 
          title={<StandardTitle />}
          actions={false} 
          redirect={false}
          sx={{ mt: 0, '& .RaEdit-noActions': { mt: 0 } }}
          
        >
          <SimpleForm toolbar={<DefaultToolbar />}>
            <Typography variant="h6">Permissions</Typography>
            <CheckboxGroupInput
              source="roles"
              choices={roles}
            />
          </SimpleForm>
        </Edit>
      </Grid>
      {aside && (
        <Grid item xs={12} md={4} sx={{ p: '16px'}}>
          {aside}
        </Grid>
      )}
    </Grid>
  )
}

interface TabConfig {
  label: string
  component: JSX.Element
  displayIf?: (user: any) => boolean
  icon?: any
}

export const UserTabsConfig: Array<TabConfig> = [
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

export const UserTabs = ({ tabsConfig=UserTabsConfig}: { tabsConfig?: Array<TabConfig>}) => {
  const record = useRecordContext()
  const { data: currentUser } = useGetIdentity()

  if (!(record && currentUser)) return <div>Loading...</div>

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
