// import { Charts } from './views'
import { VersionStream } from './resources/versions/StreamList'
import { Versions } from './resources/versions'

export { mockVersions } from './mockVersions'

export class CoreVersions {
  // static Charts = Charts
  static Resource = Versions
  static VersionStream = VersionStream
}
