import { Button } from '@mui/material'
import { ReactNode } from 'react'
import { FilterPayload, SortPayload, useListContext } from 'react-admin'

export const ListPresetButton = ({
  sortSpec,
  label,
  filterSpec,
}: {
  sortSpec: SortPayload
  label: string | ReactNode
  filterSpec: FilterPayload
}) => {
  const { setSort, setFilters } = useListContext()

  const handleChangeSort = () => {
    setFilters(filterSpec, [], false)
    setSort(sortSpec)
  }

  return (
    <Button
      aria-controls="simple-menu"
      aria-haspopup="true"
      sx={{ color: 'grey' }}
      size="small"
      onClick={handleChangeSort}
    >
      {label}
    </Button>
  )
}
