import {
  Datagrid,
  DatagridProps,
  DeleteWithConfirmButton,
  EditButton,
  InfiniteList,
  InfiniteListProps,
  List,
  ListProps,
  TextField,
  TextInput,
  useRecordContext,
} from 'react-admin'

import {
  DateField,
  PolymorphicReferenceField,
} from '@groovestack/base'
import { CommentCreate } from './Create'
import { CommentField } from './Fields'

const filters = [
  <TextInput key={0} source="q" label="Search" alwaysOn />,
  // TODO <DateRangeInput sourcce="created_at" label="Date" alwaysOn />,
]

export const CommentsTable = ({
  listProps,
  datagridProps,
  children,
  infinite = false,
  stream = false,
}: {
  listProps?: InfiniteListProps | ListProps
  datagridProps?: DatagridProps
  children?: React.ReactNode
  infinite?: boolean
  stream?: boolean
}) => {
  const record = useRecordContext()
  // const {children as c, ...rest} = listProps
  //@ts-ignore 2339
  const {key, ...restDatagridProps} = datagridProps

  const mergedListProps = Object.assign(
    stream ? { actions: false, children: null } : {},
    listProps || {},
  )
  const mergedDatagridProps = Object.assign(
    stream ? { bulkActionButtons: false } : {},
    restDatagridProps || {},
  )

  const ListComponent = infinite || stream ? InfiniteList : List
  const renderChildren = children || (stream ? <CommentField /> : null)
  if (!record) return null

  return (
    <>
      <CommentCreate />

      {/* @ts-ignore-line */}
      <ListComponent
        sort={{ field: 'created_at', order: 'DESC' }}
        filters={stream ? undefined : filters}
        resource="Comment"
        filter={record ? { resource_id: record.id } : {}}
        {...mergedListProps}
      >
        {renderChildren ? (
          <Datagrid rowClick="edit" {...mergedDatagridProps}>
            {renderChildren}
          </Datagrid>
        ) : (
          <Datagrid rowClick="edit" {...mergedDatagridProps}>
            <PolymorphicReferenceField source="author" sortable={false} />
            <PolymorphicReferenceField source="resource" sortable={false} />
            <TextField source="body" label="Comment" sortable={false} />
            <DateField source="created_at" label="Date" />
            <EditButton />
            <DeleteWithConfirmButton />
          </Datagrid>
        )}
      </ListComponent>
    </>
  )
}
