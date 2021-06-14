import { NotAcceptableException } from '@nestjs/common'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { Topic } from '../entities/topic.entity'
import {
  ICreateTopic,
  ICreateTopicReact,
  IDeleteTopic,
  IUpdateTopic,
} from '../interfaces/topic.interface'
import { TopicReactionRepository } from '../repositories/topic-reaction.repository'
import { TopicRepository } from '../repositories/topic.repository'
import {
  TTopic,
  TTopicReact,
  TUpdatedTopic,
} from '../transformers/topic.transformer'

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicRepository)
    private topicRepo: TopicRepository,
    @InjectRepository(TopicReactionRepository)
    private topicReactRepo: TopicReactionRepository,
  ) {}

  async createTopic(data: ICreateTopic): Promise<Topic> {
    const createdTopic = await this.topicRepo.save(data)
    return createdTopic
  }

  async getTopicReactions(topicId: number): Promise<TTopicReact[]> {
    const topicReacts = await this.topicReactRepo.find({ topicId })
    return plainToClass(TTopicReact, topicReacts)
  }

  async getTopicReaction(
    topicId: number,
    userId: number,
  ): Promise<TTopicReact> {
    const topicReact = await this.topicReactRepo.findOne({ topicId, userId })
    return plainToClass(TTopicReact, topicReact)
  }

  async getTopic(topicId: number): Promise<TTopic> {
    const topic = await this.topicRepo.findOne({
      where: { id: topicId, deletedAt: null },
      relations: ['topicReactions'],
    })
    return plainToClass(TTopic, topic)
  }

  async createTopicReact(data: ICreateTopicReact): Promise<TTopicReact> {
    const topicReaction = await this.getTopicReaction(data.topicId, data.userId)
    if (topicReaction) {
      await this.topicReactRepo.delete({
        topicId: data.topicId,
        userId: data.userId,
      })
      if (topicReaction.reaction === data.reaction) return topicReaction
    }
    const createdTopicReact = await this.topicReactRepo.save(data)
    return plainToClass(TTopicReact, createdTopicReact)
  }

  async updateTopic(data: IUpdateTopic): Promise<TUpdatedTopic> {
    const topic = await this.topicRepo.findOne({
      id: data.topicId,
      deletedAt: null,
    })
    if (!topic) throw new NotFoundException('Topic not found')
    if (topic.userId != data.userId)
      throw new NotAcceptableException('User not owner')
    topic.name = data.name
    topic.body = data.body
    const updatedTopic = await this.topicRepo.save(topic)
    return plainToClass(TUpdatedTopic, updatedTopic)
  }

  async deleteTopic(data: IDeleteTopic): Promise<TUpdatedTopic> {
    const topic = await this.topicRepo.findOne({
      id: data.topicId,
      deletedAt: null,
    })
    if (!topic) throw new NotFoundException('Topic not found')
    if (topic.userId != data.userId)
      throw new NotAcceptableException('User not owner')
    topic.deletedAt = new Date()
    const updatedTopic = await this.topicRepo.save(topic)
    return plainToClass(TUpdatedTopic, updatedTopic)
  }
}
