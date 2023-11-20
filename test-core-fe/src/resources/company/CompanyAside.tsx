import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from '@mui/material'
import { SimpleShowLayout, TextField } from 'react-admin'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { DateField as CoreDateField } from '@groovestack/base'
import { Comments } from '@groovestack/comments'
// import { CoreVersions } from '@groovestack/versions'

import { Versions } from '@groovestack/versions'
import { inlineLayout } from '../inlineLayout'

export const CompanyAside = () => {
  // const record = useRecordContext()
  return (
    <Paper sx={{ minWidth: 300, maxWidth: 500, p: 0, ml: 2 }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Comments.Stream /> */}
          <Comments.List stream />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Changes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Versions.Stream />
        </AccordionDetails>
      </Accordion>
      <SimpleShowLayout sx={{ ...inlineLayout, m: 2, p: 0, marginBottom: 5 }}>
        <TextField source="id" />
        {/* <DateField source="created_at" label="created" />  // For comparison purposes */}
        <CoreDateField source="created_at" label="created" />
        <CoreDateField source="updated_at" label="updated" />
      </SimpleShowLayout>
    </Paper>
  )
}
