import { Lines } from './resource'
import { ReferenceManyLines } from './resource/ReferenceManyLines'

export { mockLines } from './mockLines'

export class CoreAccounting {
  static Lines = Lines
  static Resource = Lines
  static ReferenceManyLines = ReferenceManyLines
  // static Resource = Transfers
}
