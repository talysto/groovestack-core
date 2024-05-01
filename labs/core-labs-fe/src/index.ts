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


import { MoneyField } from './react-admin/fields/MoneyField'
import { MoneyInput } from './react-admin/inputs/MoneyInput/MoneyInput'
import { AddressField } from './react-admin/fields/AddressField'
import { AddressInput } from './react-admin/inputs/AddressInput'

/**
 * function utilities
 * @public
 */
export {  }

/**
 * React Admin Fields
 * @public
 */
export {
  MoneyField, AddressField
}

/**
 * React Admin Inputs
 * @public
 */
export { MoneyInput, AddressInput }

/**
 * React Admin Components
 * @public
 */
export {  }

/**
 * MUI Components
 * @public
 */
export {  }
