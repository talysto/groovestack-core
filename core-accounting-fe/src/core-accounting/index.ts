import { Lines, Transfers } from './resource'
import { ReferenceManyLines } from './resource/ReferenceManyLines'

export { mockLines } from './mockLines'
export { mockTransfers } from './mockLines'

export class CoreAccounting {
  static Lines = Lines
  static Resource = Lines
  static ReferenceManyLines = ReferenceManyLines
  // static Resource = Transfers
}
