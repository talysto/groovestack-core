// import { Button, Menu, MenuItem, Tooltip, IconButton } from '@material-ui/core';
import { Button } from '@mui/material'
import { ReactNode } from 'react'
import { SortPayload, useListContext } from 'react-admin'

const SortFilterButton = ({
  sortSpec,
  label,
  filterSpec,
}: {
  sortSpec: SortPayload
  label: string | ReactNode
  filterSpec: any
}) => {
  const { sort, setSort, filterValues, setFilters } = useListContext()

  // // rely on the translations to display labels like 'Sort by sales descending'
  // const translate = useTranslate();

  const handleChangeSort = (event: any) => {
    const field = event.currentTarget.dataset.sort
    // setSort(field, (field === sort.field ? inverseOrder(sort.order) : 'ASC'));
    setFilters(filterSpec, [])
    setSort(sortSpec)
    // setSort(
    //     field,
    //     field === sort.field
    //         ? inverseOrder(sort.order)
    //         : 'ASC'
    // )
    // setAnchorEl(null);
  }

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        // startIcon={<SortIcon />}
        // endIcon={<ArrowDropDownIcon />}
        size="small"
        // data-sort={sortField}
        // key={sortField}
        onClick={handleChangeSort}
      >
        {label}
      </Button>
    </>
  )
}

// const inverseOrder = (sort: string) => (sort === 'ASC' ? 'DESC' : 'ASC');

export default SortFilterButton
