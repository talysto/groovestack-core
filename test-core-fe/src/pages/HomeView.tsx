import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material'

const stack = [
  { name: 'React Admin' },
  { name: 'MUI' },
  { name: 'Typescript / React' },
  { name: 'GraphQL' },
  { name: 'Ruby / Rails' },
  { name: 'PostgreSQL' },
]

export const HomeView = () => (
  <Paper elevation={2} sx={{ minHeight: 600, p: 5, minWidth: 800 }}>
    <h2>CORE Platform</h2>
    <p>
      The CORE Platform is a suite of modules that provide full-stack
      functionality to allow you to build new bespoke platforms faster than
      ever.
    </p>

    <h3>Design Approach</h3>
    <ul>
      <li>DX First</li>
      <li>Reasonable Defaults</li>
      <li>Extensible</li>
      <li>Minimal Depdendencies</li>
      <li>Green tests on all releases</li>
    </ul>

    <h3>CORE Modules</h3>
    <ul>
      <li>Base - shared elements leveraged by most CORE modules</li>
      <li>
        <b>Jobs</b> - reliable, persistent asynchronous job management.
        [PostgreSQL, que gem ]
      </li>
      <li>
        <b>Comments</b> - Allow admins (or end users) to record notes about any
        database record
      </li>

      <li>
        Webhooks - authenticate, log, and process webhooks from integrated
        applications
      </li>
      <li>Lookups - enable admin and user management of custom lookups.</li>
      <li>
        <b>Accounting</b> - double entry accounting for any type of financial
        transactions [double_entry gem]
      </li>
      <li>
        <b>Versions/Changes</b> - track changes to database records [paper_trail
        gem]{' '}
      </li>
      <li>Auth - FE components</li>
    </ul>

    <h3>CORE Stack</h3>
    <List dense>
      {stack.map((layer) => (
        <ListItem>
          {/* <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon> */}
          <ListItemText
            primary={layer.name}
            // secondary={secondary ? 'Secondary text' : null}
          />
        </ListItem>
      ))}
    </List>
  </Paper>
)
