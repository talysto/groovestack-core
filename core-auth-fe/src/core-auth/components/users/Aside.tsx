import LaunchIcon from '@mui/icons-material/Launch'
import { Paper, Typography } from '@mui/material'
import {
  ChipField,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from 'react-admin'

const IconOff = () => (
  <LaunchIcon sx={{ fontSize: '0.75em' }} color="disabled" />
)

const sidebarConfig = [
  // { label: 'Comments', component: <></> },
  // { key: 'onboarding', label: 'Onboarding', component: <OnboardingProgress /> },
  // { label: 'Features', component: <FeatureFlags /> },
]

const inlineLayout = {
  sx: { '& .RaLabeled-label': { display: 'inline-block', minWidth: 60 } },
}

export const Aside = () => {
  const record = useRecordContext()

  return (
    <Paper elevation={0} sx={{ minWidth: 400, width: '33%', ml: 1, p: 2 }}>
      <SimpleShowLayout {...inlineLayout}>
        <TextField source="id" label="ID" />
        <ChipField source="status" size="small" label="Status" />
      </SimpleShowLayout>

      {sidebarConfig.map((section, index) => (
        <Paper sx={{ p: 2, mb: 3 }} id={`${section.key}-header`}>
          <Typography component="h4" variant="h6">
            {section.label}
          </Typography>
          <div>{section.component}</div>
        </Paper>
      ))}
    </Paper>
  )
}
