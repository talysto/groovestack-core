// import { Charts } from './views'
import { CommentStream } from './resources/comments/StreamList'
import { Comments } from './resources/comments'

export { mockComments } from './mock-comments'

export class CoreComments {
  // static Charts = Charts
  static Resource = Comments
  static CommentStream = CommentStream
}
