import StarsIcon from '@mui/icons-material/Stars'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { StoryObj } from '@storybook/react'
import { withFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { RatingInput } from './RatingInput'

export default {
  title: 'Core Labs/Rating/RatingInput',
  component: RatingInput,
  decorators: [withFormContext],
}

type Story = StoryObj<typeof RatingInput>

export const MoreExamples: Story = {
  render: () => <RatingInputExamples />,
}

const RatingInputExamples = () => {
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
    code: '<RatingInput source="price" />',
    component: <RatingInput source="rating" />,
    desc: 'RatingInput acts as a standard ReactAdmin Input.',
  },
  {
    code: `<RatingInput source="rating" componentProps={{ emptyIcon: <StarsIcon />, icon: <StarsIcon color=\'error\' /> }} />`,
    component: (
      <RatingInput
        source="rating"
        componentProps={{ emptyIcon: <StarsIcon />, icon: <StarsIcon color='error' /> }}
      />
    ),
    desc: 'An example of the input with MUI Rating Props also being set to effect the visuals, in this case, setting the icon to a red circle with a star inside.',
  },
  {
    code: `<RatingInput source="rating" componentProps={{ size: 'small', precision: .5, max: 10 }} />`,
    component: (
      <RatingInput
        source="rating"
        componentProps={{ size: 'small', precision: 0.5, max: 10 }}
      />
    ),
    desc: 'Some other more commonly used MUI Props for this input include changing the size, precision and range.',
  },
]
