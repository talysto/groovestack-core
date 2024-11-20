import {
  Box,
  Chip,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from '@mui/material'
import { useState } from 'react'
import { FilterPayload, SortPayload, useListContext } from 'react-admin'
import { numberToHuman } from '../components/util'

export interface ListViewToggleButtonsProps {
  sortfilterToggles: Array<{
    label: string
    value: string
    icon: React.ElementType
    collapsable?: boolean
    filterSpec: FilterPayload
    sortSpec: SortPayload
    count?: number
  }>
}

export const ListPresetButtonGroup = ({
  sortfilterToggles,
}: ListViewToggleButtonsProps) => {
  const [selected, setSelected] = useState<string | null>('summary')

  const { setSort, setFilters } = useListContext()

  const handleSelected = (
    _event: React.MouseEvent<HTMLElement>,
    newSelected: string | null,
  ) => {
    const config = sortfilterToggles.find((t) => t.value === newSelected)
    if (config) {
      setFilters(config.filterSpec, [], false)
      setSort(config.sortSpec)
    }
    setSelected(newSelected)
  }
  const moreThanSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('sm'),
  )

  return (
    <ToggleButtonGroup
      size="small"
      value={selected}
      exclusive
      onChange={handleSelected}
    >
      {sortfilterToggles.map(({ label, value, icon, collapsable, count }) => {
        const ButtonIcon = icon
        return (
          <ToggleButton value={value} key={value} aria-label={label}>
            <ButtonIcon fontSize="small" />
            {(moreThanSmall || !collapsable) && (
              <Box sx={{ mx: 1 }}>{label}</Box>
            )}
            {!!count && count > 0 && (
              <Chip label={numberToHuman(count)} variant="outlined" size="small" />
            )}
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}
