import {
  Datagrid,
  DeleteWithConfirmButton,
  Edit,
  EditProps,
  FunctionField,
  List,
  PasswordInput,
  RaRecord,
  ReferenceField,
  ReferenceManyField,
  Show,
  SimpleForm,
  TabProps,
  TabbedShowLayout,
  TextField,
  TextInput,
  useGetIdentity,
  useRecordContext,
  useUpdate,
} from 'react-admin'

import SettingsIcon from '@mui/icons-material/TuneOutlined'
import { Box, Switch } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'

import { TopToolbar } from '../../../components/TopToolbar'
import { EmailSettings } from '../edit/EmailSettings'
import { StandardTitle } from '../../../components/StandardTitle'
import { AddressInput } from '../../../components/AddressInput'

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

const membershipSparseFields = [
  'id',
  'org_unit_id',
  'subscribe_email',
  'subscribe_sms',
]

function PreferenceSwitch({
  rec,
  attribute,
}: {
  rec: RaRecord
  attribute: string
}) {
  const record = useRecordContext()

  const [checked, setChecked] = useState(record[attribute])
  const [update, { isLoading, error }] = useUpdate()
  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  useEffect(() => {
    if (checked != record[attribute])
      update('Membership', {
        id: rec.id,
        data: { [attribute]: checked },
        previousData: rec,
      })
  }, [checked])

  if (error) {
    return <p>ERROR</p>
  }
  return (
    <Switch checked={checked} disabled={isLoading} onChange={handleClick} />
  )
}

const NotificationPreferencesList = () => {
  const user = useRecordContext()

  return (
    <List
      sort={{ field: 'org_unit.name', order: 'ASC' }}
      resource="Membership"
      filter={{ user_id: user.id }}
      actions={false}
      queryOptions={{ meta: { sparse_fields: membershipSparseFields } }}
    >
      <Datagrid bulkActionButtons={false}>
        <ReferenceField
          label="Association"
          source="org_unit_id"
          reference="OrgUnit"
          link={false}
        >
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          label="email"
          render={(membership: RaRecord) => (
            <PreferenceSwitch rec={membership} attribute={'subscribe_email'} />
          )}
        />
        <FunctionField
          label="sms"
          render={(membership: RaRecord) => (
            <PreferenceSwitch rec={membership} attribute={'subscribe_sms'} />
          )}
        />
      </Datagrid>
    </List>
  )
}

const GeneralSettings = () => (
  <SimpleForm>
    <TextInput source="name" fullWidth />
    <TextInput source="phone" fullWidth />
    <AddressInput source="address" fullWidth />

    <TextInput disabled source="language" fullWidth />
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
    title: 'Communication',
    groups: [
      {
        description: 'How to connect with you.',
        component: (
          <Edit {...DefaultEditProps} mutationMode="pessimistic">
            <EmailSettings />
          </Edit>
        ),
      },
      {
        label: 'Notifications',
        description: 'Opt-out of communications from specific groups.',
        component: <NotificationPreferencesList />,
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
