import { Typography } from '@mui/material'
import { useRecordContext } from 'react-admin'

export const ChangesTable = ({
  changesDisplayed,
}: {
  changesDisplayed: number
}) => {
  const record = useRecordContext()
  if (!record) return null

  return (
    <table>
      <tbody>
        {record &&
          record.changes &&
          record.changes
            .filter((idx: number) => idx < changesDisplayed)
            .map((change: string[], idx: number) => (
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
                  {change[1][1] && (
                    <Typography
                      component="div"
                      sx={{ mr: 1, lineHeight: 1.25 }}
                    >
                      {change[1][1]}
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
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  )
}
