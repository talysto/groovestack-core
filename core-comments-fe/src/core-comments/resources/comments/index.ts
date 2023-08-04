import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'

import { CommentEdit } from './Edit'
import { CommentsTable } from './CommentsTable'

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