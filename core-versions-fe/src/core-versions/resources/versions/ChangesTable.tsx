import { Typography } from '@mui/material'
import { useRecordContext } from 'react-admin'
import { detailedDiff } from 'deep-object-diff'

const ObjectChanges = ({from, to}: {from:object, to:object}) => {
  const diff = Object.fromEntries(Object.entries(detailedDiff(from, to)).filter(([, v]) => v != null && Object.keys(v).length != 0 ))


  return <>
  {diff.added && <Typography
  component="div"
  title={'added'}
  sx={{
    color: 'text.secondary',
    fontSize: '90%',
    lineHeight: 1.25,
  }}>
    <pre><code>ADDED {JSON.stringify(diff.added, null, 2)}</code></pre>
  </Typography>}

  {diff.deleted && <Typography
  component="div"
  title={'deleted'}
  sx={{
    color: 'text.secondary',
    fontSize: '90%',
    lineHeight: 1.25,
  }}>
    <pre><code>REMOVED {JSON.stringify(diff.deleted, null, 2)}</code></pre>
  </Typography>}

  {diff.updated && <Typography
  component="div"
  title={'updated'}
  sx={{
    color: 'text.secondary',
    fontSize: '90%',
    lineHeight: 1.25,
  }}>
    <pre><code>UPDATED {JSON.stringify(diff.updated, null, 2)}</code></pre>
  </Typography>}

  {/* {<Typography
  component="div"
  title={'updated'}
  sx={{
    color: 'text.secondary',
    fontSize: '90%',
    lineHeight: 1.25,
  }}>
    <pre><code>{JSON.stringify(diff, null, 2)}</code></pre>
  </Typography>} */}

  </>
}

const SimpleChange = ({from, to}:{from:string|undefined, to:string|undefined}) => <>
{to && (
  <Typography
    component="div"
    sx={{ mr: 1, lineHeight: 1.25 }}
  >
    {to?.toString()}
  </Typography>
)}
{from && (
  <Typography
    component="div"
    title={from}
    sx={{
      color: 'text.secondary',
      fontSize: '90%',
      lineHeight: 1.25,
    }}
  >
    (
    <span style={{ textDecoration: 'line-through' }}>
      {from?.toString().substring(0, 120)}
    </span>
    )
  </Typography>
)}
</>

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
            .filter((_item: any, idx: number) => idx < changesDisplayed)
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
                  {typeof(change[1][1]) === 'object' ? <ObjectChanges from={change[1][0]} to={change[1][1]} /> : <SimpleChange from={change[1][0]} to={change[1][1]}  />
                  }
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  )

}