import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { StoryObj } from '@storybook/react'
import { withEditFormContext } from '../../../../../../stories/RAStorybookDecorators'
import { SocialLinkInput } from './SocialLinkInput'

export default {
  title: 'Core Labs/SocialLink/SocialLinkInput',
  component: SocialLinkInput,
  decorators: [withEditFormContext],
}

type Story = StoryObj<typeof SocialLinkInput>

export const MoreExamples: Story = {
  render: () => <SocialLinkInputExamples />,
}

const SocialLinkInputExamples = () => {
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
    code: '<SocialLinkInput source="instagram_url" sx={{ minWidth: 300}} />',
    component: (
      <SocialLinkInput source="instagram_url" sx={{ minWidth: 300 }} />
    ),
    desc: 'SocialLinkInput acts as a standard ReactAdmin Input. Here we set the source to instagram_url, and the input will smart detect and display the instagram icon.',
  },

  {
    code: '<SocialLinkInput source="tiktok_url" sx={{ minWidth: 300}} />',
    component: <SocialLinkInput source="tiktok_url" sx={{ minWidth: 300 }} />,
    desc: 'Here is another example, but using the tik tok platform. As you can see, the icon is now a tik tok icon.',
  },

  {
    code: '<SocialLinkInput source="facebook_url" disabled sx={{ minWidth: 300}} />',
    component: (
      <SocialLinkInput source="facebook_url" disabled sx={{ minWidth: 300 }} />
    ),
    desc: "Finally here's an example of facebook, for this platform we have not defined an Icon so it is given a default one. We have also disabled the input.",
  },
]
