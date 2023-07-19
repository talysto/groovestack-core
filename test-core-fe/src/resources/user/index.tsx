// import { CoreComments } from '@moonlight-labs/core-comments-fe'
// import { CoreVersions } from '@moonlight-labs/core-versions-fe'
// import { CoreAccounting } from '@moonlight-labs/core-accounting-fe'

// import { users } from '../../data/mock-data-provider'
// import { faker } from '@faker-js/faker'
// import { useFormContext } from 'react-hook-form'
// import { v4 as uuidv4 } from 'uuid'

import UserIcon from '@mui/icons-material/PeopleAltOutlined'
import { UserEdit } from './UserEdit'
import { UserList } from './UserList'

export class User {
  static List = UserList
  static Edit = UserEdit
  static Icon = UserIcon
}

// const EditToolbar = () => {
//   // const notify = useNotify();
//   const formContext = useFormContext()
//   // console.log("formContext EDIT = ", formContext)
//   // const formState = useFormState();
//   // console.log("formState = ", formState)

//   // const refresh = useRefresh();
//   return (
//     <Toolbar>
//       <SaveButton
//         type="button"
//         label="Comment"
//         variant="text"
//         mutationOptions={{
//           onSuccess: () => {
//             //formContext?.reset();
//             window.scrollTo(0, 0)
//             // notify("changes saved")
//             // refresh();
//             // notify('ra.notification.created', {
//             //     type: 'info',
//             //     messageArgs: { smart_count: 1 },
//             // });
//           },
//         }}
//       />
//     </Toolbar>
//   )
// }
