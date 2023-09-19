import * as React from 'react';
// import { Button, Menu, MenuItem, Tooltip, IconButton } from '@material-ui/core';
import SortIcon from '@mui/icons-material/Sort';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SortPayload, useListContext, useListSortContext, useTranslate } from 'react-admin';
import { Button, Menu, MenuItem } from '@mui/material';
import { ReactNode, useState } from 'react';

const SortFilterButton = ({ sortSpec, label, filterSpec }: { sortSpec: SortPayload, label: string | ReactNode, filterSpec: any }) => {

    const { sort, setSort, filterValues, setFilters } = useListContext();

    // // rely on the translations to display labels like 'Sort by sales descending'
    // const translate = useTranslate();


    const handleChangeSort = (event:any) => {
        const field = event.currentTarget.dataset.sort;
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
    };



    return (<>
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

    </>);
};

// const inverseOrder = (sort: string) => (sort === 'ASC' ? 'DESC' : 'ASC');

export default SortFilterButton;