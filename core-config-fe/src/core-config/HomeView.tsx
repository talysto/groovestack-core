import { Paper } from '@mui/material'
import { DemoWelcome } from './DemoWelcome'
import { ModuleIndex } from './ModuleIndex'

// export const Components = ({components}) => (
//   <ul>
//       {components.members[0].members.map((member: any, idx:number) => (
//         <li key={idx}>{member.name} ({member.kind})</li>
//       ))}
//     </ul>
// )

export const HomeView = ({ modules }: { modules?: any[] }) => (
  <Paper elevation={2} sx={{ minHeight: 600, p: 5, minWidth: 800 }}>
    <DemoWelcome modules={modules} />
    <ModuleIndex />
  </Paper>
)
