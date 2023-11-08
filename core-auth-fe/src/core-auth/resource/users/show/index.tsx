import {
  Datagrid,
  DateInput,
  DeleteWithConfirmButton,
  Edit,
  EditProps,
  FunctionField,
  ImageField,
  ImageInput,
  PasswordInput,
  RaRecord,
  ReferenceManyField,
  SelectInput,
  Show,
  SimpleForm,
  TabProps,
  TabbedShowLayout,
  TextInput,
  useGetIdentity,
  useRecordContext,
} from 'react-admin'

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import SettingsIcon from '@mui/icons-material/TuneOutlined'
import { Box, Typography } from '@mui/material'
// import { CodeField } from '@moonlight-labs/core-base-fe'

import { StandardTitle } from '../../../components/StandardTitle'
import { TopToolbar } from '../../../components/TopToolbar'

import SettingsTabs from '../../../components/SettingsTabs'

export function titleCase(str: string): string {
  return str
    .split(' ')
    .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

const ChangePasswordForm = () => (
  <SimpleForm>
    <PasswordInput disabled source="current_password" />
    <PasswordInput disabled source="password" />
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

const GeneralSettings = () => (
  <SimpleForm>
    <TextInput source="name" fullWidth />
    <TextInput source="email" type="email" fullWidth />
    <SelectInput source="language" choices={languageChoices} fullWidth />
    <ImageInput source="avatar_image">
      <ImageField source="0" title="avatar image" />
    </ImageInput>
  </SimpleForm>
)

const ConfirmDeleteIdentityContent = () => {
  const record = useRecordContext()

  return (
    <Box>
      Are you sure you want to delete your {titleCase(record.provider)} login?
    </Box>
  )
}

const DefaultEditProps: EditProps = {
  redirect: false,
  actions: false,
}

export const settingsConfig = [
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
            <ChangePasswordForm />
          </Edit>
        ),
      },
      {
        label: 'Social Logins',
        description: 'Connect social accounts to enable single sign-on',
        component: (
          <Edit {...DefaultEditProps}>
            <ReferenceManyField
              reference="Identity"
              target="user_id"
              label={false}
            >
              <Datagrid bulkActionButtons={false}>
                <FunctionField
                  label="provider"
                  render={(rec: RaRecord) => {
                    return (
                      <>
                        <Box sx={{ display: 'inline-block', pl: 0.5 }}>
                          {titleCase(rec.provider)}
                        </Box>
                      </>
                    )
                  }}
                />
                <DeleteWithConfirmButton
                  redirect={false}
                  title="Disconnect"
                  confirmTitle="Delete Social Login"
                  confirmContent={<ConfirmDeleteIdentityContent />}
                />
              </Datagrid>
            </ReferenceManyField>
          </Edit>
        ),
      },
    ],
  },
]

const IdentitiesExpand = () => {
  return (
    <>asfd</>
    // <CodeField
    //   record={{
    //     requestBlob: {
    //       provider: 'google', // Replace with the actual OmniAuth provider you are mocking
    //       uid: '123456789', // Replace with a unique user identifier
    //       info: {
    //         email: 'user@example.com',
    //         name: 'John Doe',
    //         // Additional user information specific to the provider
    //       },
    //       credentials: {
    //         token: 'your_access_token',
    //         expires: false,
    //         // Additional credentials specific to the provider
    //       },
    //       extra: {
    //         // Additional data specific to the provider
    //       },
    //     },
    //   }}
    //   source="requestBlob"
    //   label="omniauth request blob"
    // />
  )
}

const AdminTab = () => {
  return (
    <Edit actions={false}>
      <SimpleForm>
        <Typography variant="h6">General</Typography>
        <DateInput disabled source="last_login_at" />
        <TextInput disabled source="sign_in_count" />
        <Typography variant="h6">User Role Management</Typography>
        //TODO
        <Box margin="10" />
        <Typography variant="h6">Identites</Typography>
        <ReferenceManyField reference="Identity" target="user_id" label={false}>
          <Datagrid
            bulkActionButtons={false}
            expand={<IdentitiesExpand />}
            expandSingle
          >
            <FunctionField
              label="provider"
              render={(rec: RaRecord) => {
                return (
                  <>
                    <Box sx={{ display: 'inline-block', pl: 0.5 }}>
                      {titleCase(rec.provider)}
                    </Box>
                  </>
                )
              }}
            />
          </Datagrid>
        </ReferenceManyField>
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

const tabsConfig: Array<TabConfig> = [
  {
    label: 'Preferences',
    icon: SettingsIcon,
    component: <SettingsTabs settings={settingsConfig} />,
    displayIf: (user: any) => true,
  },
  {
    label: 'Admin',
    icon: AdminPanelSettingsIcon,
    component: <AdminTab />,
    displayIf: (user: any) => true,
  },
]

const UserTabs = () => {
  const record = useRecordContext()
  const { data: currentUser } = useGetIdentity()

  if (!record) return <div>Loading...</div>

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
