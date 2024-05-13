import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { StoryObj } from '@storybook/react'
import { RatingField } from './RatingField'

export default {
  title: 'Core Labs/Rating/RatingField',
  component: RatingField,
}

type Story = StoryObj<typeof RatingField>

export const MoreExamples: Story = {
  render: () => <RatingFieldExamples />,
}

const RatingFieldExamples = () => {
  return (
    <Paper>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Output</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {examples.map((example, idx) => (
            <TableRow key={idx}>
              <TableCell>
                {/* <Source code={example.code} /> */}
                <code>{example.code}</code>
              </TableCell>
              <TableCell>{example.component}</TableCell>
              <TableCell>{example.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
const examples = [
  {
    code: '<RatingField source="price" record={{value: 4}} />',
    component: <RatingField record={{ value: 4 }} source="value" />,
    desc: "RatingField acts as a standard ReactAdmin field.",
  },
  {
    code: '<RatingField source="value" record={{value: 5}} componentProps={{size: \'large\'}} />',
    component: <RatingField record={{ value: 5 }} source="value" componentProps={{size: 'large'}} />,
    desc: "RatingField RA field with an example of a MUI Rating Props also being set, in this case, size: 'large'.",
  },

 //TODO key props empty icon and icon, precision, etc. (also cross reference moneyfield for any other cases that I may want to have a story for here)
]
