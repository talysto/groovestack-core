import { StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'

import { Carousel } from './Carousel'
import { IMAGES } from './Images'

export default {
  title: 'Core Labs/Media/Carousel',
  component: Carousel,
  argTypes: {
    imgs: { control: 'array' }
  },
  parameters: {
    controls: {
      expanded: true,
      exclude: ['sx', 'bar', 'componentProps', 'record'],
    },
  },
  tags: ['autodocs'],
}
type Carousel = ComponentProps<typeof Carousel>
type Story = StoryObj<Carousel>

/**
 * RatingField can take a currency prop as an atomic value or an object.
 */
export const Basic: Story = {
  args: {
    imgs: IMAGES,
  },
  render: (args) => {
    return <Carousel imgs={IMAGES} />
  }
}
