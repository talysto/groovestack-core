// import { Charts } from './views'
import { VersionStream } from './resources/versions/StreamList'
import { Versions } from './resources/versions'

export { mockVersions } from './mock-versions'

export class CoreVersions {
  // static Charts = Charts
  static Resource = Versions
  static VersionStream = VersionStream
}
