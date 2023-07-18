import {
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  ReferenceManyCount,
  ReferenceManyField,
  SaveButton,
  SelectInput,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  Toolbar,
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

import { users } from '../../data/mock-data-provider'
import { faker } from '@faker-js/faker'
import { useFormContext } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { inlineLayout } from '../inlineLayout'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Comments = CoreComments.Comments
const Versions = CoreVersions.Versions
const Lines = CoreAccounting.Lines

const mockCommentDefaults = () => {
  return {
    id: uuidv4(),
    body: '',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
  }
}

export const UserAside = () => {
  const lineFilters = [
    <SelectInput
      alwaysOn
      source="code"
      choices={[
        { id: 'buy_aqd', name: 'Buy AQD' },
        { id: 'spend_aqd', name: 'Spend AQD' },
      ]}
    />,
  ]
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
            <Comments.Stream
              createProps={{
                authorResolver: () => faker.helpers.arrayElement(users),
                defaultValues: mockCommentDefaults,
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
            <Versions.Stream />
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
            <Lines.ReferenceManyLines tableProps={{ filters: lineFilters }} />
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  )
}

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      {/* <TextField source="type" /> */}
      <DateField source="created_at" label="Registered"/>
    </Datagrid>
  </List>
)

export const UserEdit = () => (
  <Edit aside={<UserAside />}>
    <SimpleForm>
      <TextInput source="name" fullWidth />
      <SimpleShowLayout {...inlineLayout} sx={{ padding: 0, marginBottom: 5 }}>
        <TextField source="id" />
        <DateField source="created_at" />
        <DateField source="updated_at" />
      </SimpleShowLayout>
    </SimpleForm>
  </Edit>
)

export class User {
  static List = UserList
  static Edit = UserEdit
}

// const EditToolbar = () => {
//   // const notify = useNotify();
//   const formContext = useFormContext()
//   // console.log("formContext EDIT = ", formContext)
//   // const formState = useFormState();
//   // console.log("formState = ", formState)

//   // const refresh = useRefresh();
//   return (
//     <Toolbar>
//       <SaveButton
//         type="button"
//         label="Comment"
//         variant="text"
//         mutationOptions={{
//           onSuccess: () => {
//             //formContext?.reset();
//             window.scrollTo(0, 0)
//             // notify("changes saved")
//             // refresh();
//             // notify('ra.notification.created', {
//             //     type: 'info',
//             //     messageArgs: { smart_count: 1 },
//             // });
//           },
//         }}
//       />
//     </Toolbar>
//   )
// }
