import { List, ListItem, ListItemText, Paper } from '@mui/material'

import pkgComments from '../../../core-comments-fe/package.json'
import { useContext } from 'react'

const stack = [
  { name: 'React Admin' },
  { name: 'MUI' },
  { name: 'Typescript / React' },
  { name: 'GraphQL' },
  { name: 'Ruby / Rails' },
  { name: 'PostgreSQL' },
]

const packagesMeta = import.meta.glob('../../../docs/meta/*.json')
// let packages = new Map<string, any>();
const packages: { [key: string]: any } = {}

for (const path in packagesMeta) {
  packagesMeta[path]().then((mod) => {
    packages[path] = mod
  })
}


// Storybook
// https://github.com/storybookjs/storybook/blob/998926f115259ffe4e9afe03b25daf34556e4756/code/ui/blocks/src/blocks/Controls.tsx#L25

// Reflection
// https://stackoverflow.com/questions/69724621/react-typescript-reflection-listing-properties-of-an-interface
const Members = ({members}: {members: []}) => {

  return (
    <ul>
      {members.map((member: any, idx: number) => {

        // console.log(argTypes)

        return (
          <li key={idx}>
            {member.name} ({member.releaseTag} {member.kind})
            {member.members && <Members members={member.members} />}
          </li>
        )
      })}
    </ul>
  )
}



export const Packages = ({packages}: {packages:any}) => {

  return (
  <ul>
    {Object.values(packages).map((pkg, idx:number) => (
      <li key={idx}>
        <b>{pkg.name}</b> - {pkg.kind} <br/>
        {/* <small>v{version} - {license}</small> <br/> */}
        <Members members={pkg.members[0].members} />
      </li>
    ))}
  </ul>
  )
}

// export const Components = ({components}) => (
//   <ul>
//       {components.members[0].members.map((member: any, idx:number) => (
//         <li key={idx}>{member.name} ({member.kind})</li>
//       ))}
//     </ul>
// )




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

    <h3>Modules</h3>
    <Packages packages={packages} />

    <h3>CORE Modules</h3>
    <ul>
      <li>
        <b>Base</b> - shared elements leveraged by most CORE modules
      </li>
      <li>
        <b>Jobs</b> - reliable, persistent asynchronous job management.
        [PostgreSQL, que gem ]
      </li>
      <li>
        <b>Accounting</b> - double entry accounting for any type of financial
        transactions [double_entry gem]
      </li>
      <li>
        <b>Versions</b> - track changes to database records [paper_trail gem]
      </li>

      <li>
        <b>Comments</b> - Allow admins (or end users) to record notes about any
        database record
        {pkgComments.version}
      </li>
    </ul>

    <h4>ROADMAP</h4>
    <ul>
      <li>
        Webhooks - authenticate, log, and process webhooks from integrated
        applications
      </li>
      <li>Lookups - enable admin and user management of custom lookups.</li>

      <li>Auth - FE components</li>
    </ul>

    <h3>CORE Stack</h3>
    <List dense>
      {stack.map((layer, idx) => (
        <ListItem key={idx}>
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
