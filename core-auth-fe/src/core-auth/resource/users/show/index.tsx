import {
  CheckboxGroupInput,
  DateField,
  Edit,
  EditProps,
  PasswordInput,
  SaveButton,
  SelectInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TabProps,
  TabbedShowLayout,
  TextField,
  TextInput,
  Toolbar,
  useGetIdentity,
  useRecordContext,
  Labeled
} from 'react-admin'

import { useParams } from 'react-router-dom'

import { IdentitiesAdminTable } from '../../identities/show/AdminTable'
import { IdentitiesTable } from '../../identities/show/table'

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import SettingsIcon from '@mui/icons-material/TuneOutlined'
import { Box, Typography } from '@mui/material'

import { StandardTitle } from '../../../components/StandardTitle'
import { TopToolbar } from '../../../components/TopToolbar'

import SettingsTabs from '../../../components/SettingsTabs'

export function titleCase(str: string): string {
  return str
    .split(' ')
    .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

const ChangePasswordForm = (props: any) => (
  <SimpleForm toolbar={<DefaultToolbar />}>
    <PasswordInput disabled={props.isDisabled} source="current_password" />
    <PasswordInput disabled={props.isDisabled} source="password" />
  </SimpleForm>
)

const languageChoices = [
  { id: 'english', name: 'English' },
  { id: 'spanish', name: 'Spanish' },
  { id: 'french', name: 'French' },
  { id: 'german', name: 'German' },
  { id: 'chinese', name: 'Chinese' },
  { id: 'arabic', name: 'Arabic' },
  { id: 'russian', name: 'Russian' },
  { id: 'japanese', name: 'Japanese' },
  { id: 'portuguese', name: 'Portuguese' },
  { id: 'italian', name: 'Italian' },
  { id: 'dutch', name: 'Dutch' },
  { id: 'korean', name: 'Korean' },
  { id: 'swedish', name: 'Swedish' },
  { id: 'greek', name: 'Greek' },
  { id: 'hindi', name: 'Hindi' },
  { id: 'turkish', name: 'Turkish' },
  { id: 'polish', name: 'Polish' },
  { id: 'vietnamese', name: 'Vietnamese' },
  { id: 'thai', name: 'Thai' },
  { id: 'romanian', name: 'Romanian' },
]

const DefaultToolbar = (props: any) => (
  <Toolbar {...props} sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <SaveButton />
  </Toolbar>
)

const GeneralSettings = () => (
  <SimpleForm toolbar={<DefaultToolbar />}>
    <TextInput source="name" fullWidth />
    <TextInput source="email" type="email" fullWidth />
    <SelectInput source="language" choices={languageChoices} fullWidth />
    <TextInput source="image" />
  </SimpleForm>
)

const DefaultEditProps: EditProps = {
  redirect: false,
  actions: false,
}

export const settingsConfig = (isDisabled: boolean) => {
  return [
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
          label: 'Password',
          description: 'Add or update your password',
          component: (
            <Edit {...DefaultEditProps}>
              <ChangePasswordForm isDisabled={isDisabled} />
            </Edit>
          ),
        },
        {
          label: 'Social Logins',
          description: 'Connect social accounts to enable single sign-on',
          component: <IdentitiesTable />,
        },
      ],
    },
  ]
}

const AdminTab = () => {
  return (
    <Edit actions={false} redirect={false}>
      <SimpleForm toolbar={<DefaultToolbar />}>
        <Typography variant="h6">General</Typography>
        <Labeled label="Last Login At">
        <DateField source="last_login_at" />
        </Labeled>
        <Labeled label="Sign In Count">
        <TextField source="sign_in_count" />
        </Labeled>
        <Typography variant="h6">User Role Management</Typography>
        <CheckboxGroupInput
          source="roles"
          choices={[{ id: 'admin', name: 'Admin' }]}
        />
        <Box margin="10" />
        <Typography variant="h6">Identites</Typography>

        <IdentitiesAdminTable />
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
  const { id } = useParams()

  const disabled = !(currentUser && currentUser.id === id) ?? true

  if (!record) return <div>Loading...</div>

  const tabsConfig: Array<TabConfig> = [
    {
      label: 'Preferences',
      icon: SettingsIcon,
      component: <SettingsTabs settings={settingsConfig(disabled)} />,
      displayIf: (user: any) => true,
    },
    {
      label: 'Admin',
      icon: AdminPanelSettingsIcon,
      component: <AdminTab />,
      displayIf: (user: any) => true,
    },
  ]

  const tabs = tabsConfig.filter(
    (tab) =>
      !tab.displayIf ||
      tab.displayIf(tab.label == 'Admin' ? currentUser : record),
  )

  return (
    <TabbedShowLayout
      sx={{ '& .RaTabbedShowLayout-content': { p: { xs: 0, md: 1 } } }}
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
  <Show title={<StandardTitle />} actions={<TopToolbar actions={false} />}>
    <UserTabs />
  </Show>
)
