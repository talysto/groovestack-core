/**
 * This package includes components that are experimental or in active development.
 * These components will not be published to NPM but you can reference them via
 * `pnpm i https://github.com/talysto/groovestack-core#labs`
 *
 * @remarks
 * The `core-labs` currently includes
 * {@link MoneyField}
 * {@link MoneyInput}
 * {@link AddressField}
 * {@link AddressInput}
 *
 * @packageDocumentation
 */

import * as pkg from '../package.json'
export { pkg }

import { AddressField } from './react-admin/address/AddressField/AddressField'
import { AddressInput } from './react-admin/address/AddressInput/AddressInput'
import { MoneyField, MoneyInput } from './react-admin/money'

/**
 * function utilities
 * @public
 */
export {}

/**
 * React Admin Fields
 * @public
 */
export { AddressField, MoneyField }

/**
 * React Admin Inputs
 * @public
 */
export { AddressInput, MoneyInput }

/**
 * React Admin Components
 * @public
 */
export {}

/**
 * MUI Components
 * @public
 */
export {}
