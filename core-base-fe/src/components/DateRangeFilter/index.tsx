import { Event as Calendar} from '@mui/icons-material'
import { Box, Chip } from '@mui/material'
import {
  DateRange,
  DateRangePicker,
  SingleInputDateRangeField,
} from '@mui/x-date-pickers-pro'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import {
  CommonDateRanges, NamedRangeType
} from './predefined_ranges'

const defaultNamedFilters: NamedRangeType[] = [
  CommonDateRanges.ThisWeek,
  CommonDateRanges.LastWeek,
  CommonDateRanges.LastFiscalYear,
  CommonDateRanges.ThisFiscalYear,
  CommonDateRanges.Last7Days,
  CommonDateRanges.ThisMonth,
  CommonDateRanges.Today,
  CommonDateRanges.Yesterday,
  CommonDateRanges.LastMonth,
  CommonDateRanges.Last30Days,
  CommonDateRanges.AllTime,
]

export type DateRangeType = DateRange<Dayjs> | undefined
export type DateRangeFilterProps = {
  namedFilters?: NamedRangeType[]
  defaultValue?: DateRangeType
  displayNamedFiltersLabels?: boolean
  onChange?: (range: DateRangeType) => void
  eodTransform?: boolean
}

const transformEndDateToEOD = (range: DateRangeType) => {
  if (!range) return range
  range[1] = range[1]?.endOf('day') as Dayjs

  return range
}

export const DateRangeFilter = ({
  namedFilters,
  onChange,
  displayNamedFiltersLabels = true,
  eodTransform = true, // transform end date of range to be eod
  defaultValue,
}: DateRangeFilterProps) => {
  if (eodTransform) defaultValue = transformEndDateToEOD(defaultValue)

  const [val, setVal] = useState<DateRangeType>(defaultValue)

  const shortcuts = namedFilters || defaultNamedFilters

  const onAccept = (range: DateRangeType) => {
    if (!onChange || !range) return

    if (eodTransform) onChange(transformEndDateToEOD(range))
    else onChange(range)
  }

  const rangeEqual = (r1: DateRangeType, r2: DateRangeType) => {
    if (!r1 || !r2) return false
    if (r1.length != 2 || r2.length != 2) return false

    return r1[0]?.isSame(r2[0]) && r1[1]?.isSame(r2[1])
  }

  const renderRangeLabel = () => (
    <Chip
      sx={{ marginLeft: '15px' }}
      label={
        // shortcuts.find((s) => rangeEqual(s.getValue(), val))?.label ||
        'Custom Date'
      }
    />
  )

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <DateRangePicker
        sx={{ width: '250px' }}
        defaultRangePosition="start"
        slots={{ field: SingleInputDateRangeField }}
        slotProps={{
          shortcuts: {
            items: shortcuts,
          },
          actionBar: { actions: ['accept'] },
          textField: { InputProps: { endAdornment: <Calendar /> } },
        }}
        onAccept={onAccept}
        onChange={(val: DateRangeType) => setVal(transformEndDateToEOD(val))}
        value={val}
        closeOnSelect={false}
        defaultValue={defaultValue}
      />
      {displayNamedFiltersLabels && renderRangeLabel()}
    </Box>
  )
}

// HELPERS that can be used for filter syncing with search params

export const formatDateRangeForSearchParams = (range: DateRangeType) => {
  if (
    !range ||
    range.length != 2 ||
    !range[0] ||
    !range[1] ||
    range[1] < range[0]
  )
    return [{ key: 'start' }, { key: 'finish' }]

  return [
    { key: 'start', value: range[0].format() },
    { key: 'finish', value: range[1].format() },
  ]
}

export const transformSearchParamsToDateRange = (
  searchParams: { key: string; value?: string }[],
) => {
  const start = dayjs(searchParams.find((sP) => sP.key == 'start')?.value)
  const end = dayjs(searchParams.find((sP) => sP.key == 'finish')?.value)

  return [start, end]
}

export * from './predefined_ranges'
