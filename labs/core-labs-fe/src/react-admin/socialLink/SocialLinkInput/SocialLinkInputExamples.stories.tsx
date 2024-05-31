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
import { SocialLinkInput, SocialMediaPlatform } from './SocialLinkInput'

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
    code: '<SocialLinkInput source="instagram_url" platform={SocialMediaPlatform.Instagram} sx={{ minWidth: 300}} />',
    component: (
      <SocialLinkInput
        source="instagram_url"
        platform={SocialMediaPlatform.Instagram}
        sx={{ minWidth: 300}}
      />
    ),
    desc: 'SocialLinkInput acts as a standard ReactAdmin Input. Here we are using the Instagram platform.',
  },

  {
    code: '<SocialLinkInput source="tiktok_url" platform={SocialMediaPlatform.TikTok} sx={{ minWidth: 300}} />',
    component: (
      <SocialLinkInput
        source="tiktok_url"
        platform={SocialMediaPlatform.TikTok}
        sx={{ minWidth: 300}}
      />
    ),
    desc: 'Here is another example, but using the tik tok platform. As you can see, the primary difference by changing the platform prop is the SocialMedia Icon.',
  },

  {
    code: '<SocialLinkInput source="facebook_url" platform={SocialMediaPlatform.Facebook} disabled sx={{ minWidth: 300}} />',
    component: (
      <SocialLinkInput
        source="facebook_url"
        platform={SocialMediaPlatform.Facebook}
        disabled
        sx={{ minWidth: 300}}
      />
    ),
    desc: "Finally here's an example of facebook, but we disabled the value.",
  },
]
