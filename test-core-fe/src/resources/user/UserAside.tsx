import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// const mockCommentDefaults = () => {
//   return {
//     id: uuidv4(),
//     body: '',
//     created_at: new Date().toDateString(),
//     updated_at: new Date().toDateString(),
//   }
// }
import { CoreVersions } from '@moonlight-labs/core-versions-fe'
import { Comments } from '@moonlight-labs/core-comments-fe'

export const UserAside = () => {
  return (
    <>
      <Paper sx={{ minWidth: 400, maxWidth: 600, p: 0, ml: 2 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Comments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Comments.Stream />
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
            <CoreVersions.Versions.Stream />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Payments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Lines.ReferenceManyLines tableProps={{ filters: lineFilters }} /> */}
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  )
}
