import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'
import { FilterPayload, SortPayload, useRecordContext } from 'react-admin'
import ListPresetButton from './ListPresetButton'

export interface ListViewToggleButtonsProps {
  sortfilterToggles: Array<{
    label: string
    value: string
    icon: JSX.Element 
    filterSpec: FilterPayload
    sortSpec: SortPayload
  }>
}

export const ListPresetButtonGroup = ({
  sortfilterToggles,
}: ListViewToggleButtonsProps) => {
  const [selected, setSelected] = useState<string | null>('reset')

  const handleSelected = (
    event: React.MouseEvent<HTMLElement>,
    newSelected: string | null,
  ) => {
    setSelected(newSelected)
  }

  return (
    <ToggleButtonGroup
      size="small"
      value={selected}
      exclusive
      onChange={handleSelected}
    >
      {sortfilterToggles.map(({ label, value, icon, filterSpec, sortSpec }) => (
        <ToggleButton value={value} key={value}>
          {icon}
          <ListPresetButton
            label={label}
            sortSpec={sortSpec}
            filterSpec={filterSpec}
          />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
