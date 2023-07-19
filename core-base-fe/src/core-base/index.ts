import { CoreDateField } from './components/CoreDateField'
import { CoreTimeAgoField } from './components/CoreTimeAgoField'
import { PolymorphicReferenceField } from './components/PolymorphicReferenceField'

export { CoreDateField }
export { CoreTimeAgoField }
export { PolymorphicReferenceField }
export class CoreBase {
  static CoreDateField = CoreDateField
  static CoreTimeAgoField = CoreTimeAgoField
  static PolymorphicReferenceField = PolymorphicReferenceField
}
