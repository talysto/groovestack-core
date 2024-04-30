/**
 * This file includes components used by other CORE modules such as enhanced React Admin Fields and Inputs.
 *
 * @remarks
 * The `core-base` defines the {@link DateField} interface and {@link TimeAgoField} components.
 * which are used to build widgets.
 *
 * @packageDocumentation
 */

import * as pkg from '../package.json'
export { pkg }

import { CommonDateRanges, DateRangeFilter } from './components/DateRangeFilter'
import { ExternalLink } from './components/ExternalLink'
import {
  CustomButtonDrawer,
  DrawerWidth,
} from './react-admin/CustomButtonDrawer'
import { CodeField } from './react-admin/fields/CodeField'
import { DateField } from './react-admin/fields/DateField'
import { MoneyField } from './react-admin/fields/MoneyField'
import { PolymorphicReferenceField } from './react-admin/fields/PolymorphicReferenceField'
import { TimeAgoField, timeAgo } from './react-admin/fields/TimeAgoField'
import { MoneyInput } from './react-admin/inputs/MoneyInput'
import { StatusInput } from './react-admin/inputs/StatusInput'
import {
  TimezoneSelectInput,
  generateTimeZoneOptions,
} from './react-admin/inputs/TimezoneSelectInput'
import { ToggleButtonInput } from './react-admin/inputs/ToggleButtonInput'
import { diffObjects, useSaveOnlyChanges } from './react-admin/hooks/useSaveOnlyChanges'
import { clickToCopy } from './util/clickToCopy'

/**
 * function utilities
 * @public
 */
export { clickToCopy, diffObjects, generateTimeZoneOptions, timeAgo }

/**
 * React Admin Fields
 * @public
 */
export {
  CodeField,
  DateField,
  MoneyField,
  PolymorphicReferenceField,
  TimeAgoField,
}

/**
 * React Admin Inputs
 * @public
 */
export { MoneyInput, StatusInput, TimezoneSelectInput, ToggleButtonInput }

/**
 * React Admin Components
 * @public
 */
export { CustomButtonDrawer, DrawerWidth }

/**
 * React Admin Hooks
 * @public
 */
export { useSaveOnlyChanges }

/**
 * MUI Components
 * @public
 */
export { CommonDateRanges, DateRangeFilter, ExternalLink }
