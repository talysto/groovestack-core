import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { SyntheticEvent, useState } from 'react'
// import {Link} from 'react-router-dom'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ flexGrow: 1 }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, pt: 1 }}>{children}</Box>}
    </div>
  )
}
function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

type settingsGroupProps = {
  title: any
  groups: {
    description: any
    component: any
    label: any
  }[]
  collapse?: boolean
}

export const SettingsGroup = ({
  groups,
  title,
  collapse = false,
}: settingsGroupProps) => {
  return (
    <>
      {groups.map(({ description, component, label }, i) => (
        <Grid key={i} container spacing={2} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} md={collapse ? 12 : 4}>
            <Typography variant="h6">{label || title}</Typography>
            <Typography variant="body2">{description}</Typography>
          </Grid>
          <Grid item xs={12} md={collapse ? 12 : 8}>
            {component}
          </Grid>
        </Grid>
      ))}
    </>
  )
}

export default function SettingsTabs({ settings }: { settings: any }) {
  const theme = useTheme()
  const moreThanSmall = useMediaQuery(theme.breakpoints.up('sm'))

  const [selectedTab, setSelectedTab] = useState(0)
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false)

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedPanel(newExpanded ? panel : false)
    }

  return (
    <>
      {moreThanSmall ? (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="Vertical tabs example"
            sx={{
              '& .MuiTab-root': { alignItems: 'flex-start', textAlign: 'left' },
              borderRight: 1,
              borderColor: 'divider',
            }}
          >
            {settings.map((setting: any, idx: any) => (
              <Tab key={idx} label={setting.title} {...a11yProps(0)} />
            ))}
          </Tabs>
          {settings.map((setting: any, idx: any) => (
            <TabPanel value={selectedTab} key={idx} index={idx}>
              <SettingsGroup {...setting} />
            </TabPanel>
          ))}
        </Box>
      ) : (
        <>
          {settings.map((setting: any, idx: any) => (
            // <Backdrop open={expandedPanel === `panel-${idx}`}>
            <Accordion
              disableGutters
              square
              // elevation={0}
              // sx={{borderTop: expandedPanel === `panel-${idx}` ? 'solid 1px #eee' : 0 }}
              // sx={{
              //   // background: '#eee',
              //   // '&:before': {
              //   //   display: 'none',
              //   // },
              //   // '&:after': {
              //   //   display: 'none',
              //   // }
              // }}
              // hidden={!!expandedPanel && expandedPanel != `panel-${idx}`}
              expanded={expandedPanel === `panel-${idx}`}
              onChange={handleAccordionChange(`panel-${idx}`)}
            >
              <AccordionSummary
                aria-controls={`panel-${idx}-content`}
                id={`panel-${idx}-header`}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography
                  // noWrap
                  variant="subtitle1"
                  fontWeight={'bold'}
                  sx={{ width: '45%', flexShrink: 0 }}
                >
                  {setting.title}
                </Typography>
                <Typography sx={{ fontSize: '80%', color: 'text.secondary' }}>
                  {setting.description}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {setting.groups.map(({ component, label, description }: {component: any, label: any, description: any}, i: any) => (
                  <div key={i}>
                    <Typography>{label}</Typography>
                    <Typography
                      sx={{ fontSize: '80%', color: 'text.secondary' }}
                    >
                      {description}
                    </Typography>
                    <Typography>{component}</Typography>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </>
    // </Box>
  )
}
