/**
 * This file includes components used by other CORE modules such as enhanced React Admin Fields and Inputs.
 *
 * @remarks
 * The `core-base` defines the {@link DateField} interface and {@link TimeAgoField} components.
 * which are used to build widgets.
 *
 * @packageDocumentation
 */

import { DateField } from './react-admin/fields/DateField'
import { TimeAgoField, timeAgo } from './react-admin/fields/TimeAgoField'
import { PolymorphicReferenceField } from './react-admin/fields/PolymorphicReferenceField'
import { MoneyField } from './react-admin/fields/MoneyField'
import { StatusInput } from './react-admin/inputs/StatusInput'
import { MoneyInput } from './react-admin/inputs/MoneyInput'
import { generateTimeZoneOptions, TimezoneSelectInput } from './react-admin/inputs/TimezoneSelectInput'
import { clickToCopy } from './react-admin/fields/clickToCopy'
import './react-admin/fields/clickToCopy.css'
import { ToggleButtonInput } from './react-admin/inputs/ToggleButtonInput'
import { ExternalLink } from './components/ExternalLink'
import { CodeField } from './react-admin/fields/CodeField'
import { DateRangeFilter, CommonDateRanges } from './components/DateRangeFilter'


/**
 * function utilities
 * @public
 */
export { timeAgo, generateTimeZoneOptions, clickToCopy }

/**
 * React Admin Fields
 * @public
 */
export { DateField, TimeAgoField, PolymorphicReferenceField, MoneyField, CodeField }

/**
 * React Admin Inputs
 * @public
 */
export { StatusInput, MoneyInput, TimezoneSelectInput, ToggleButtonInput }

/**
 * MUI Components
 * @public
 */
export { ExternalLink, DateRangeFilter, CommonDateRanges }
