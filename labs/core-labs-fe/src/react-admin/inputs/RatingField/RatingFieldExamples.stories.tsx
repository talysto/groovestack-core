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
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
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
    component: <RatingField record={{ value: 3 }} source="value" componentProps={{emptyIcon: <FavoriteIcon />, icon: <FavoriteIcon /> }} />,
    desc: "An example with MUI Rating Props also being set to effect the visuals, in this case, setting the icon to a heart.",
  },
  {
    code: '<RatingField source="value" record={{value: 4.5}} componentProps={{size: \'large\'}} />',
    component: <RatingField record={{ value: 4.5 }} source="value" componentProps={{size: 'small', precision: .5, max: 10}} />,
    desc: "Some other more commonly used MUI Props include changing the size, precision and range.",
  }
]
