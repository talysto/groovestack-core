import { Box, Toolbar } from '@mui/material'
import { UserIdField } from './UserIdField'

export const TopToolbar = ({ actions }) => (
  <Toolbar
    variant="dense"
    sx={{ justifyContent: 'space-between' }}
    disableGutters
  >
    {/* no Delete */}
    <Box sx={{ p: 1 }}>
      <UserIdField />
    </Box>
    {actions}
  </Toolbar>
)
