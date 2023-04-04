import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  dateComponent: {
    '& .date-component': {
      display: 'none'
    },
    '&:hover .date-component': {
      display: 'block',
      position: 'absolute',
      background: 'lightgrey',
      padding: 5,
      borderRadius: 10,
      bottom: '65%',
      left: 0
    }
  }
})

export const CoreDateComponent = (props: CoreDateComponentProps) => {
  const classes = useStyles()
  const { date, showTime, enableHover } = props

  if (showTime) return (
    <div className={ classes.dateComponent }>
      {new Date(date).toLocaleDateString()}, {new Date(date).toLocaleTimeString()}
      <span className={enableHover ? 'date-component' : ''}>
        {date}
      </span>
    </div>
  )
  
  return (
    <div className={ classes.dateComponent }>
      {new Date(date).toLocaleDateString()}
      <span className={enableHover ? 'date-component' : ''}>
        {date}
      </span>
    </div>
  )
}

export interface CoreDateComponentProps {
  date: string,
  showTime: boolean, // shows the formatted date in addition to the current time i.e. 11/11/2023, 11:11:11 AM
  enableHover: boolean // shows the original unformatted date string on hover above formatted date
}