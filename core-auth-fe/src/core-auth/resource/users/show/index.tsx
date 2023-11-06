import {
  Datagrid,
  DeleteWithConfirmButton,
  Edit,
  EditProps,
  FunctionField,
  PasswordInput,
  RaRecord,
  ReferenceManyField,
  Show,
  SimpleForm,
  TabProps,
  TabbedShowLayout,
  TextInput,
  useGetIdentity,
  useRecordContext
} from 'react-admin'

import SettingsIcon from '@mui/icons-material/TuneOutlined'
import { Box } from '@mui/material'

import { TopToolbar } from '../../../components/TopToolbar'
import { StandardTitle } from '../../../components/StandardTitle'

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

const GeneralSettings = () => (
  <SimpleForm>
    <TextInput source="name" fullWidth />
    <TextInput source="email" fullWidth />
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
  actions: false
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
  }
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
