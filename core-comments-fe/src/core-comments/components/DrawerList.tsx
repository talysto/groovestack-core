import React, { useState } from 'react'

import { Drawer } from '@mui/material'
import { makeStyles } from '@mui/material/styles'

import CommentTopBar from './DrawerTopBar'
import CardList from './CardList'
import { DrawerListProps } from '../types'

const useStyles = makeStyles({
  drawerContent: {
    width: 400,
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
  },
})

const DrawerList = (props: DrawerListProps) => {
  //   const classes = useStyles() // TODO Refactor
  const { handleClose, open, resourceId, resource } = props

  return (
    <Drawer open={open} anchor="right" onClose={handleClose}>
      <div
      //   className={classes.drawerContent}
      >
        <CommentTopBar />
        <CardList resourceId={resourceId} resource={resource} />
      </div>
    </Drawer>
  )
}

export default DrawerList
