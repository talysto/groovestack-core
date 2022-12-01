import React from 'react'

type LiveTableProps = {
  columns: {key: string; label?: string;}[]
  refreshData: () => Promise<any>;
  refreshInterval?: number;
  transform?: (data: any) => any[]
}

export const LiveTable: React.FC<LiveTableProps> = ({ columns, refreshData, refreshInterval, transform }) => {
  const [data, setData] = React.useState<any[]>([])

  const fetchData = async () => {
    console.log('LiveTable: fetching data...')
    try {
      const data = await refreshData()
      console.log('LiveTable: fetched data', data)
      setData(transform ? transform(data) : data)
    } catch(e){
      console.error(e)
    }
  }

  React.useEffect( () => {
    fetchData()

    let interval: Timeout;

    if (refreshInterval && refreshInterval != 0){
      interval = setInterval(fetchData, 1000 * refreshInterval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [])

  return (
    <table className="pivot-table" style={{ width: "100%" }}>
      <thead>
        <tr>
          {columns.map(({key, label}, i) => <th key={i}>{label ? label.toUpperCase() : key.toUpperCase()}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((record, i) => (
          <tr key={i}>
            {columns.map(({key}, k) => (
              <td key={`${i}-${k}`}>{record[key]}</td>
            ))}
          </tr>
        ))}
      
      </tbody>
    </table>
  )
}