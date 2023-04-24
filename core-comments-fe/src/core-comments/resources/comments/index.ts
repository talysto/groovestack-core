import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'

import { CommentShow } from './Show'
import { CommentCreate } from './Create'
import { CommentEdit } from './Edit'
import { CommentsTable } from './TableList'
import { CommentStream } from './StreamList'

export class Comments {
  static Icon = CommentOutlinedIcon
  static Show = CommentShow
  static Create = CommentCreate
  static Edit = CommentEdit
  static List = CommentsTable
  static Stream = CommentStream
}
