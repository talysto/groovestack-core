import { BottomNavigationClassKey } from '@mui/material'
import React from 'react'
import { number } from 'react-admin';

type LiveTableProps = {
  columns: { key: string; label?: string, render?: (v: string) => string }[]
  emptyContent?: React.ReactElement
  refreshData: () => Promise<any>
  refreshInterval?: number
  transform?: (data: any) => any[]
  rowTotals?: boolean
}

type Timeout = ReturnType<typeof setTimeout>

export const LiveTable: React.FC<LiveTableProps> = ({
  columns,
  emptyContent,
  refreshData,
  refreshInterval,
  transform,
  rowTotals = false,
}) => {
  const [data, setData] = React.useState<any[]>([])

  const fetchData = async () => {
    console.log('LiveTable: fetching data...')
    try {
      const data = await refreshData()
      console.log('LiveTable: fetched data', data)
      setData(transform ? transform(data) : data)
    } catch (e) {
      console.error(e)
    }
  }

  const renderTableBody = () => {
    if (data.length == 0 && emptyContent) return emptyContent

    return (
      <>
        {data.map((record, i) => (
          <tr key={i}>
            {columns.map(({ key, render }, k) => (
              <td key={`${i}-${k}`} title={record[key]}>{render ? render(record[key]) : record[key]}</td>
            ))}
          </tr>
        ))}
        {rowTotals && data.length > 0 ? (
          <tr> 
            {columns.map(({ key }, k) => (
              <td style={{fontWeight: 'bold'}} key={`total-${k}`}>{Number(data[0][key]) == NaN ? null : data.reduce((prev, curr) => prev + Number(curr[key]), 0)}</td>
            ))}
          </tr>
        ) : null}
      </>
    )
  }

  React.useEffect(() => {
    fetchData()

    let interval: Timeout

    if (refreshInterval && refreshInterval != 0) {
      interval = setInterval(fetchData, 1000 * refreshInterval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [])

  return (
    <table className="pivot-table" style={{ width: '100%' }}>
      <thead>
        <tr>
          {columns.map(({ key, label }, i) => (
            <th key={i}>{label ? label.toUpperCase() : key.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {renderTableBody()}
      </tbody>
    </table>
  )
}
