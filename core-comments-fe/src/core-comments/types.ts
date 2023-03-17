import { FieldProps, Identifier, RaRecord } from 'react-admin'

// export interface Comment extends RaRecord {}

export interface CardListProps extends FieldProps {
  resourceId: Identifier | undefined
  resource: string
}
export interface CommentCardProps extends RaRecord {
  status: string // first | middle | attach,
  record: any
}

export interface DrawerListProps {
  handleClose: () => void
  open: boolean
  resourceId: Identifier | undefined
  resource: string
}
