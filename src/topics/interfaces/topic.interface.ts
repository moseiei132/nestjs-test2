export interface ICreateTopic{
    userId: number

    name: string

    body: string
}

export interface ICreateTopicReact{
    topicId: number
    userId: number
    reaction: string
}