import { Exclude } from 'class-transformer'

export class TComment {
  id: number

  topicId: number

  userId: number

  body: string

  createdAt: Date

  updatedAt: Date

  @Exclude()
  deletedAt: Date

  commentReactions: TCommentReact[]

  constructor(partial: Partial<TComment>) {
    Object.assign(this, partial)
  }
}

export class TUpdatedComment {
  id: number

  userId: number

  topicId: number

  body: string

  createdAt: Date

  updatedAt: Date

  @Exclude()
  deletedAt: Date

  constructor(partial: Partial<TUpdatedComment>) {
    Object.assign(this, partial)
  }
}

export class TCommentReact {
  userId: number

  @Exclude()
  commentId: number

  reaction: string

  constructor(partial: Partial<TCommentReact>) {
    Object.assign(this, partial)
  }
}
