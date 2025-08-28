import { DateRange, PickersShortcutsItem } from '@mui/x-date-pickers-pro'
import dayjs, { Dayjs } from 'dayjs'

export type NamedRangeType = PickersShortcutsItem<DateRange<Dayjs>>

export class CommonDateRanges {
  static Today : NamedRangeType = {
    label: 'Today',
    getValue: () => {
      const today = dayjs()
      return [today.startOf('day'), today.endOf('day')]
    },
  }

  static Yesterday: NamedRangeType = {
    label: 'Yesterday',
    getValue: () => {
      const yesterday = dayjs().subtract(1, 'day')
      return [yesterday.startOf('day'), yesterday.endOf('day')]
    },
  }

  static Last30Days: NamedRangeType = {
    label: 'Last 30 Days',
    getValue: () => {
      const thirtyDaysAgo = dayjs().subtract(30, 'day')
      return [thirtyDaysAgo.startOf('day'), dayjs().endOf('day')]
    },
  }

  static AllTime: NamedRangeType = {
    label: 'All Time',
    getValue: () => {
      return [dayjs(`2010-01-01`).startOf('day'), dayjs().endOf('day')]
    },
  }

  static ThisWeek: NamedRangeType = {
    label: 'This Week',
    getValue: () => {
      const today = dayjs()
      return [today.startOf('week'), today.endOf('week')]
    },
  }

  static LastWeek: NamedRangeType = {
    label: 'Last Week',
    getValue: () => {
      const today = dayjs()
      const prevWeek = today.subtract(7, 'day')
      return [prevWeek.startOf('week'), prevWeek.endOf('week')]
    },
  }

  static LastFiscalYear: NamedRangeType = {
    label: 'Last Fiscal Year',
    getValue: () => {
      const currentYear = dayjs().year()
      const previousYear = dayjs().subtract(2, 'year').year()
      const lastYear = dayjs().subtract(1, 'year').year()
      const nextYear = dayjs().add(1, 'year').year()
      const compare = dayjs() < dayjs(`${currentYear}-07-01`)

      const lastFiscalYearStart = compare
        ? dayjs(`${previousYear}-07-01`)
        : dayjs(`${currentYear}-07-01`)
      const lastFiscalYearFinish = compare
        ? dayjs(`${lastYear}-06-30`)
        : dayjs(`${nextYear}-06-30`)

      return [
        lastFiscalYearStart.startOf('day'),
        lastFiscalYearFinish.endOf('day'),
      ]
    },
  }

  static ThisFiscalYear: NamedRangeType = {
    label: 'This Fiscal Year',
    getValue: () => {
      const currentYear = dayjs().year()
      const lastYear = dayjs().subtract(1, 'year').year()
      const nextYear = dayjs().add(1, 'year').year()
      const compare = dayjs() < dayjs(`${currentYear}-07-01`)

      const lastFiscalYearStart = compare
        ? dayjs(`${lastYear}-07-01`)
        : dayjs(`${currentYear}-07-01`)
      const lastFiscalYearFinish = compare
        ? dayjs(`${currentYear}-06-30`)
        : dayjs(`${nextYear}-06-30`)

      return [
        lastFiscalYearStart.startOf('day'),
        lastFiscalYearFinish.endOf('day'),
      ]
    },
  }

  static Last7Days: NamedRangeType = {
    label: 'Last 7 Days',
    getValue: () => {
      const today = dayjs()
      return [today.subtract(7, 'day').startOf('day'), today.endOf('day')]
    },
  }

  static ThisMonth: NamedRangeType = {
    label: 'This Month',
    getValue: () => {
      const today = dayjs()
      return [today.startOf('month'), today.endOf('month')]
    },
  }

  static LastMonth: NamedRangeType = {
    label: 'Last Month',
    getValue: () => {
      const today = dayjs()
      const lastDayOfLastMonth = today.startOf('month').subtract(1, 'day')
      return [
        lastDayOfLastMonth.startOf('month'),
        lastDayOfLastMonth.endOf('month'),
      ]
    },
  }

  static ThisCalendarYear: NamedRangeType = {
    label: 'This Calendar Year',
    getValue: () => {
      const today = dayjs()
      return [today.startOf('year'), today.endOf('year')]
    },
  }

  static LastCalendarYear: NamedRangeType = {
    label: 'Last Calendar Year',
    getValue: () => {
      const lastYear = dayjs().subtract(1, 'year')
      return [lastYear.startOf('year'), lastYear.endOf('year')]
    },
  }

}