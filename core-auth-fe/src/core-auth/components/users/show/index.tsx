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

import { TimezoneSelectInput } from '@moonlight-labs/core-base-fe'
import SettingsIcon from '@mui/icons-material/TuneOutlined'
import { Box, Switch } from '@mui/material'
import { StyledIcon } from '@styled-icons/styled-icon'
import { ChangeEvent, useEffect, useState } from 'react'
import { MoreIcons } from '../../shared/MoreIcons'
import SettingsTabs from '../../shared/SettingsTabs'
import { StandardTitle } from '../../shared/StandardTitle'
import { AddressInput } from '../../shared/inputs/AddressInput'

import { TopToolbar } from '../TopToolbar'
import { AvatarUpload } from '../edit/AvatarUpload'
import { EmailSettings } from '../edit/EmailSettings'

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
    // don't update membership here using checked b/c of race condition with setting state
    // either needed to use event.target.checked OR use a useEffect to update membership (as done below)
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
      sort={{ field: 'org_unit.name', order: 'asc' }}
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
    <AvatarUpload />
    <TextInput source="name" fullWidth />
    <TextInput source="phone" fullWidth />
    <AddressInput source="address" fullWidth />

    {/* <GoogleAddressAutocompleteInput
  fieldProps={{
    required: isRequired,
    error: (isTouched || isSubmitted) && invalid,
    helperText: (
      <InputHelperText
      touched={isTouched || isSubmitted}
      error={error?.message} />
      ),
      label: 'Address'
    }}
    onSelectOption={(place: PlaceType) => {
      field.onChange(place?.description || null); // undefined is not acceptable prop for react-hook-form. pass null to clear address
    }}
  defaultValue={field.value} /> */}
    <TextInput disabled source="language" fullWidth />
    <TimezoneSelectInput source="timezone" />
  </SimpleForm>
)

const { Apple, Facebook, Google, Microsoft } = MoreIcons
const identityProviders: { [k: string]: StyledIcon } = {
  google: Google,
  apple: Apple,
  facebook: Facebook,
  microsoft: Microsoft,
}

const ConfirmDeleteIdentityContent = () => {
  const record = useRecordContext()

  return (
    <Box>
      Are you sure you want to delete your {titleCase(record.provider)} login?
    </Box>
  )
}

const DefaultEditProps: EditProps = {
  // sx: { '& .RaEdit-noActions': { marginTop: 0 } },
  redirect: false,
  actions: false,
  // queryOptions: {
  //   meta: {
  //     extra_fields: ['currency', 'price', 'default_donation'] // these aren't SCALAR types so they need to be requested additionally
  //   }
  // }
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
              // sort={{ field: 'status', order: 'ASC' }}
              // {...rest}
            >
              <Datagrid bulkActionButtons={false}>
                {/* <TextField source="provider" /> */}
                <FunctionField
                  label="provider"
                  render={(rec: RaRecord) => {
                    const Icon = identityProviders[rec.provider]

                    return (
                      <>
                        {Icon && <Icon size={'1em'} />}
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
  // {
  //   label: 'Memberships',
  //   component: <MembershipList />,
  //   // component: <Memberships.List />,
  //   icon: Memberships.Icon,
  //   displayIf: (user: any) => true,
  // },
  // {
  //   label: 'Leaderships',
  //   component: <LeadershipsTable />,
  //   displayIf: (user: any) => true,
  // },
  // {
  //   label: 'Payments',
  //   component: <PaymentList storeKey="User.Payment.listParams" />,
  //   icon: Payments.Icon,
  //   displayIf: (user: any) => true,
  // },
  {
    label: 'Preferences',
    icon: SettingsIcon,
    component: <SettingsTabs settings={settingsConfig} />,
    displayIf: (user: any) => true,
  },
  // {
  //   label: 'Admin',
  //   icon: MoreIcons.Admin,
  //   component: <AdminPanel />,
  //   displayIf: (currentUser: any) => currentUser.roles.includes('admin'),
  // },
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
      // tabs={<TabbedShowLayoutTabs variant="scrollable" scrollButtons={true} allowScrollButtonsMobile
      // aria-label="scrollable force tabs example" />}
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
