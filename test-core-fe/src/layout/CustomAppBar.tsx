// in src/MyAppBar.js
// import { NotificationMenuButton } from '@groovestack/notifications'
// import { AppBar, Logout, TitlePortal, UserMenu } from 'react-admin'
import { AppBar, TitlePortal } from 'react-admin'
import { Auth } from '@groovestack/auth'

// const SettingsMenuItem = React.forwardRef((props, ref) => {
//   // We are not using MenuItemLink so we retrieve the onClose function from the UserContext
//   const { onClose } = useUserMenu();
//   return (
//       <MenuItem
//           onClick={onClose}
//           ref={ref}
//           // It's important to pass the props to allow Material UI to manage the keyboard navigation
//           {...props}
//       >
//           <ListItemIcon>
//               <SettingsIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText>Customize</ListItemText>
//       </MenuItem>
//   );
// });

export const CustomAppBar = (props: any) => {
  return (
    <AppBar
      color="primary"
      userMenu={
        <Auth.Users.Menu {...props} />
          // {/* <SettingsMenuItem /> */}
        //   <Logout />
        // </Auth.Users.Menu>
      }
    >
      <TitlePortal />
      {/* <NotificationMenuButton /> */}
    </AppBar>
  )
}
