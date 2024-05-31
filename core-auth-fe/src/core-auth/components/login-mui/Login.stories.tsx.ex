// import { Box, Grid, styled, Typography } from '@mui/material'
// import type { Meta, StoryObj } from '@storybook/react'

// import { LoginPanel } from './LoginPanel'
// // import { Layouts } from '../../stories/totem/Layouts'

// // More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
// const meta = {
//   title: 'Components / MUI',
//   component: LoginPanel,
//   decorators: [],
//   // parameters: {
//   //   layout: 'fullscreen',
//   // },
// } satisfies Meta<typeof LoginPanel>

// export default meta
// type Story = StoryObj<typeof meta>

// // More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
// // export const LoginPanelViewMui: Story = {
// //   args: {
// //     primary: true,
// //     label: 'Button',
// //   },
// // }
// // LoginPanelViewMui.storyName = 'Login (MUI)'

// const Item = styled(Box)(({ theme }) => ({
//   // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   // ...theme.typography.body2,
//   // padding: theme.spacing(0.5),
//   // textAlign: 'center',
//   // color: theme.palette.text.secondary,
// }))

// const scenarios = [
//   {
//     title: 'TOTEM',
//     config: (
//       <LoginPanel onPasswordReset={() => alert('Password Reset attempt')} />
//     ),
//   },
//   {
//     title: 'Atmos',
//     config: <LoginPanel social={[{ k: 'epic' }]} />,
//   },
// ]
// export const LoginPanelStories: Story = {
//   render: () => (
//     <Grid container spacing={2}>
//       {scenarios.map((scene, idx) => (
//         <Grid item xs={12} sm={6} md={4} key={idx}>
//           <Item sx={{ p: 1 }}>
//             <Typography variant="h5">{scene.title}</Typography>
//             {scene.config}
//           </Item>
//         </Grid>
//       ))}
//     </Grid>
//   ),
// }
// LoginPanelStories.name = 'LoginPanelStories'
