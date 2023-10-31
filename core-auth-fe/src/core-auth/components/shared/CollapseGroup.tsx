import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material'

export const CollapseGroup = ({ sections }) => {
  // const record = useRecordContext()
  return (
    <Box>
      {sections.map((section, i: number) => (
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-content-${i}`}
            id={`panel-header-${i}`}
          >
            <Typography>{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{section.component}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}
