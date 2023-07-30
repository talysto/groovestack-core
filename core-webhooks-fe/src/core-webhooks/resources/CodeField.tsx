import { Box } from '@mui/material'
import { FieldProps, useRecordContext } from 'react-admin'
// import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco'

SyntaxHighlighter.registerLanguage('json', json)

// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export const CodeField = ({ source }: FieldProps) => {
  const record = useRecordContext()
  if (!record || !source) return null

  const code = JSON.stringify(record[source], null, 2) || ''

  return (
    <Box sx={{ border: 1, borderColor: 'grey.500', borderRadius: '6px' }}>
      <SyntaxHighlighter
        language="javascript"
        style={docco}
        customStyle={{ margin: 0, borderRadius: '6px' }}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  )
}
