import {ReferenceManyLines} from './ReferenceManyLines'
import { LineShow } from './show'
import { Table, TransferList } from "./table"
import HistoryIcon from '@mui/icons-material/History'

export class Lines {
  static Icon = HistoryIcon
  static List = Table
  static ReferenceManyLines = ReferenceManyLines
  static Show = LineShow
  // // static Show = ShowSession
  // static Icon = PlaylistAddCheckIcon
}



export class Transfers {
  static Icon = HistoryIcon
  static List = TransferList
  
  // static ReferenceManyLines = ReferenceManyLines
  // static Show = LineShow

  // // static Show = ShowSession
  // static Icon = PlaylistAddCheckIcon
}



// import HistoryIcon from '@mui/icons-material/History'

// import { VersionsTable } from './TableList'

// export class Versions {
//   static Icon = HistoryIcon
//   static List = VersionsTable
//   // static Edit = CommentEdit
//   // static Show = CommentShow
//   // static Create = CommentCreate
// }