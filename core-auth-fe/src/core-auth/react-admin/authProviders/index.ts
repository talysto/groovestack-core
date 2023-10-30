import { liveAuthProviderFactory as LiveFactory } from './liveFactory'
import { mockAuthProvider as Mock } from './mock'

export class Providers {
  static BaseFactory = LiveFactory
  static Mock = Mock
}