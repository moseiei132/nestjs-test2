export interface ICreateTopic {
  userId: number

  name: string

  body: string
}

export interface IUpdateTopic {
  userId: number

  topicId: number

  name: string

  body: string
}

export interface IDeleteTopic {
  userId: number

  topicId: number
}

export interface ICreateTopicReact {
  topicId: number

  userId: number

  reaction: string
}
