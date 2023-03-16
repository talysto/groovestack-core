// import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'

import { CommentEdit } from './Edit'
import { CommentCreate } from './Create'
import { CommentsTable } from './TableList'
import { CommentShow } from './Show'

export class Comments {
  // static Icon = CommentOutlinedIcon
  static List = CommentsTable
  static Edit = CommentEdit
  static Show = CommentShow
  static Create = CommentCreate
}
