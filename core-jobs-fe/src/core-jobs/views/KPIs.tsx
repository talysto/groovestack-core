import { Button, Paper, Popover } from '@mui/material'
import { useState } from 'react'
import { Metric, MetricType } from '../components/Metric'
import { WorkersTable } from '../resource/workers/WorkersTable'

// const data: MetricType[] = [
//   { label: 'Workers', value: '16', onClick:{handleClick} },
//   { label: 'Running', value: '42' },
// ]

export const MetricPopover = ({
  metricProps,
  children,
}: {
  metricProps: MetricType
  children: any
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <Metric aria-describedby={id} onClick={handleClick} {...metricProps} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {children}
      </Popover>
    </div>
  )
}

const BasicPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Workers
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        <Paper sx={{ p: 3 }}>
          <WorkersTable />
        </Paper>
      </Popover>
    </div>
  )
}
