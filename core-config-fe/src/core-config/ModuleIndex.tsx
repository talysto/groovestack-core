import { Box } from '@mui/material'

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
const Members = ({ members }: any) => {
  return (
    <ul>
      {members.map((member: any, idx: any) => {
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

export const Packages = ({ packages }: any) => {
  return (
    <ul>
      {Object.values(packages).map((pkg: any, idx) => (
        <li key={idx}>
          <b>{pkg.name}</b> - {pkg.kind} <br />
          <small>
            v{pkg.version} - {pkg.license}
          </small>{' '}
          <br />
          <Members members={pkg.members[0].members} />
        </li>
      ))}
    </ul>
  )
}

export const ModuleIndex = () => {
  return (
    <Box>
      <h3>Modules</h3>
      <Packages packages={packages} />
    </Box>
  )
}
