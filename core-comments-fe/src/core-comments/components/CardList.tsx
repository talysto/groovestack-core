import { useEffect, useState } from 'react'

// import { makeStyles, Theme, createStyles } from '@mui/material/styles';

import {
  DeleteParams,
  UpdateParams,
  useDataProvider,
  useNotify,
} from 'react-admin'
import CommentCard from './CommentCard'
import { CardListProps } from '../types'
// import { FETCH_COMMENTS } from 'comments/shared/gql'
// import apolloAdminClient from "clients/apollo/admin";

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         listContainer: {
//             height: "calc(100% - 50px)",
//             overflow: "auto"
//         },
//     }),
// );

const FETCH_COMMENTS = ''

const CardList = (props: CardListProps) => {
  // const classes = useStyles();
  const { resource, resourceId } = props
  const [comments, setComments] = useState<any[]>([])
  const dataProvider = useDataProvider()
  const notify = useNotify()

  const fetchComments = async () => {
    try {
      // const { data: { allComments: comments } } = await apolloAdminClient.query({ query: FETCH_COMMENTS, fetchPolicy: 'no-cache', variables: { sortField: 'createdAt', sortOrder: 'DESC', filter: { resourceId, resourceType: resource } } })
      // console.log('fetched comments', comments)
      // setComments(comments)
    } catch (e) {
      console.error(e)
    }
  }

  const handleDelete = ({
    id,
    previousData,
    onSuccess,
  }: DeleteParams & { onSuccess: () => void }) => {
    dataProvider
      .delete('admin/comment', { id, previousData })
      .then(async (response) => {
        onSuccess()
        await fetchComments()
        notify('Deleted successfully', { type: 'success' })
      })
      .catch((error) => console.log(error))
  }

  const handleCreate = (info: any) => {
    dataProvider
      .create('admin/comment', { data: info })
      .then((response) => {
        fetchComments()
        notify('Created successfully', { type: 'success' })
      })
      .catch((error) => console.log(error))
  }

  const handleUpdate = ({
    id,
    data,
    previousData,
    onSuccess,
  }: UpdateParams & { onSuccess: () => void }) => {
    dataProvider
      .update('admin/comment', { id, data, previousData })
      .then(async (response) => {
        onSuccess()
        await fetchComments()
        notify('Updated successfully', { type: 'success' })
      })
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div
    // className={classes.listContainer}
    >
      <CommentCard
        id={-1}
        status="create"
        record={{ resource, resourceId }}
        handleCreate={handleCreate}
      />
      {comments.map((comment: any, index: number) => {
        return (
          <CommentCard
            id={comment.id}
            key={index}
            card_index={index}
            status="rud"
            record={comment}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        )
      })}
    </div>
  )
}

export default CardList
