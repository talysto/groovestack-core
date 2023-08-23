import { Typography } from '@mui/material'
import { useRecordContext } from 'react-admin'
import { detailedDiff } from 'deep-object-diff'

export const ChangesTable = ({
  changesDisplayed,
}: {
  changesDisplayed: number
}) => {
  const record = useRecordContext()
  if (!record) return null

  const objectDiff = (from: any, to: any) => {
    const diffObject = Object.fromEntries(Object.entries(detailedDiff(from, to)).filter(([_, v]) => v != null && Object.keys(v).length != 0 ))

    // console.debug('from', from)
    // console.debug('to', to)
    // console.debug('diffObject', diffObject)


    return <Typography
    component="div"
    title={'object changes'}
    sx={{
      color: 'text.secondary',
      fontSize: '90%',
      lineHeight: 1.25,
    }}>
      <pre><code>{JSON.stringify(diffObject, null, 2)}</code></pre>
    </Typography>
  }

  return (
    <table>
      <tbody>
        {record &&
          record.changes &&
          record.changes
            .filter((item: any, idx: number) => idx < changesDisplayed)
            .map((change: any, idx: number) => (
              <tr key={idx}>

                <td
                  style={{ maxWidth: '25%', minWidth: 80, marginRight: '1em' }}
                >
                  <Typography
                    component="div"
                    sx={{ textTransform: 'uppercase', fontSize: '80%' }}
                  >
                    {change[0]}
                  </Typography>
                </td>

                <td
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                  }}
                >
                  {typeof(change[1][1]) === 'object' ? objectDiff(change[1][0], change[1][1]) : <>
                    {change[1][1] && (
                      <Typography
                        component="div"
                        sx={{ mr: 1, lineHeight: 1.25 }}
                      >
                        {change[1][1]?.toString()}
                      </Typography>
                    )}
                    {change[1][0] && (
                      <Typography
                        component="div"
                        title={change[1][0]}
                        sx={{
                          color: 'text.secondary',
                          fontSize: '90%',
                          lineHeight: 1.25,
                        }}
                      >
                        (
                        <span style={{ textDecoration: 'line-through' }}>
                          {change[1][0]?.toString().substring(0, 120)}
                        </span>
                        )
                      </Typography>
                    )}
                    </>
                  }
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  )
}