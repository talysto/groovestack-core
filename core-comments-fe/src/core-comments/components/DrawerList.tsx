import { Drawer } from '@mui/material'

import { DrawerListProps } from '../types'
import CardList from './CardList'
import CommentTopBar from './DrawerTopBar'

const DrawerList = (props: DrawerListProps) => {
  //   const classes = useStyles() // TODO Refactor
  const { handleClose, open, resourceId, resource } = props

  return (
    <Drawer open={open} anchor="right" onClose={handleClose}>
      <div>
        <CommentTopBar />
        <CardList resourceId={resourceId} resource={resource} />
      </div>
    </Drawer>
  )
}

export default DrawerList
