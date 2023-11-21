import { Paper } from '@mui/material'
import { DemoWelcome } from './DemoWelcome'
import { WelcomeBanner } from './WelcomeBanner'

export const HomeView = ({ modules }: { modules?: any[] }) => (
  <Paper elevation={2} sx={{ minHeight: 600, p: 5, minWidth: 800 }}>
    <DemoWelcome modules={modules} />
    <WelcomeBanner />
  </Paper>
)
