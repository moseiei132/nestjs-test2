import { Exclude } from 'class-transformer'

export class TTopic {
  id: number

  userId: number

  name: string

  body: string

  createdAt: Date

  updatedAt: Date

  @Exclude()
  deletedAt: Date

  topicReactions: TTopicReact[]

  constructor(partial: Partial<TTopic>) {
    Object.assign(this, partial)
  }
}

export class TUpdatedTopic {
  id: number

  userId: number

  name: string

  body: string

  createdAt: Date

  updatedAt: Date

  @Exclude()
  deletedAt: Date

  constructor(partial: Partial<TUpdatedTopic>) {
    Object.assign(this, partial)
  }
}

export class TTopicReact {
  userId: number

  @Exclude()
  topicId: number

  reaction: string

  constructor(partial: Partial<TTopicReact>) {
    Object.assign(this, partial)
  }
}
