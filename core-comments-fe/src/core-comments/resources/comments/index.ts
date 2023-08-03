import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'

// import { CommentShow } from './Show.tsx.legacy'
// import { CommentCreate } from './Create'
import { CommentEdit } from './Edit'
import { CommentsTable } from './CommentsTable'
// import { CommentStream } from './StreamList'

// TODO implement recordReprsentation default
// @usage
//
// A column in a ReactAdmin Datagrid to show the number of comments
// <ReferenceManyCount
//   label="Comments"
//   reference="Comment"
//   target="resource_id"
// />
export class Comments {
  static Icon = CommentOutlinedIcon
  static List = CommentsTable
  static Edit = CommentEdit

  // static Show = CommentShow
  // static Create = CommentCreate
  // static Stream = CommentStream
}