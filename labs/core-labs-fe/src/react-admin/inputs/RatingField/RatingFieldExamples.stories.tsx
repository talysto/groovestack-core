import FavoriteIcon from '@mui/icons-material/Favorite'
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
    code: '<RatingField source="price" record={{rating: 4}} />',
    component: <RatingField record={{ rating: 4 }} source="rating" />,
    desc: 'RatingField acts as a standard ReactAdmin field.',
  },
  {
    code: `<RatingField record={{ rating: 3 }} source="rating" componentProps={{ emptyIcon: <FavoriteIcon />, icon: <FavoriteIcon /> }} />`,
    component: (
      <RatingField
        record={{ rating: 3 }}
        source="rating"
        componentProps={{ emptyIcon: <FavoriteIcon />, icon: <FavoriteIcon /> }}
      />
    ),
    desc: 'An example with MUI Rating Props also being set to effect the visuals, in this case, setting the icon to a heart.',
  },
  {
    code: `<RatingField record={{ rating: 4.5 }} source="rating" componentProps={{ size: 'small', precision: .5, max: 10 }} />`,
    component: (
      <RatingField
        record={{ rating: 4.5 }}
        source="rating"
        componentProps={{ size: 'small', precision: 0.5, max: 10 }}
      />
    ),
    desc: 'Some other more commonly used MUI Props include changing the size, precision and range.',
  },
]
