import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['Core Base', 'Core Versions', 'Core Labs', 'Example'],
      },
    },
    docs: {
      toc: true, // 👈 Enables the table of contents
    },
  },
}

export default preview
