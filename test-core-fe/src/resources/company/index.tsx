import {
  Datagrid,
  DateField,
  Edit,
  List,
  ReferenceManyCount,
  ReferenceManyField,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  useRecordContext,
} from 'react-admin'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from '@mui/material'
import { CoreComments } from '@moonlight-labs/core-comments-fe'
import { CoreVersions } from '@moonlight-labs/core-versions-fe'
import { CoreAccounting } from '@moonlight-labs/core-accounting-fe'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { users } from '../../data/mock-data-provider'
import { faker } from '@faker-js/faker'
import { inlineLayout } from '../inlineLayout'

const Comments = CoreComments.Comments
const Versions = CoreVersions.Versions

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
          <Comments.Stream
            createProps={{
              authorResolver: () => faker.helpers.arrayElement(users),
            }}
          />
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
          <Versions.Stream changesDisplayed={1} />
        </AccordionDetails>
      </Accordion>
    </Paper>
  )
}

export const CompanyList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" sx={{ fontWeight: 'bold' }} />
      <TextField source="address" />
      <ReferenceManyCount
        label="Comments"
        reference="Comment"
        target="resource_id"
      />
      <DateField source="created_at" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
)

export const CompanyEdit = () => (
  <Edit aside={<CompanyAside />}>
    <SimpleForm>
      <TextInput source="name" fullWidth />
      <TextInput source="address" fullWidth />
      <SimpleShowLayout {...inlineLayout} sx={{ padding: 0, marginBottom: 5 }}>
        <TextField source="id" />
        <DateField source="created_at" />
        <DateField source="updated_at" />
      </SimpleShowLayout>
    </SimpleForm>
  </Edit>
)

export class Company {
  static List = CompanyList
  static Edit = CompanyEdit
}
