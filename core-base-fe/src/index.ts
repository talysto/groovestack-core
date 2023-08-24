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


/**
 * function utilities
 * @public
 */
export { timeAgo, generateTimeZoneOptions }

/**
 * React Admin Fields
 * @public
 */
export { DateField, TimeAgoField, PolymorphicReferenceField, MoneyField }

/**
 * React Admin Inputs
 * @public
 */
export { StatusInput, MoneyInput, TimezoneSelectInput }
