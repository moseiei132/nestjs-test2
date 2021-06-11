import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { TopicReaction } from "../entities/topic-reaction.entity";
import { Topic } from "../entities/topic.entity";
import { ICreateTopic, ICreateTopicReact } from "../interfaces/topic.interface";
import { TopicReactionRepository } from "../repositories/topic-reaction.repository";
import { TopicRepository } from "../repositories/topic.repository";
import { TTopic, TTopicReact } from "../transformers/topic.transformer";

@Injectable()
export class TopicService{
    constructor(
        @InjectRepository(TopicRepository)
        private topicRepo: TopicRepository,
        @InjectRepository(TopicReactionRepository)
        private topicReactRepo: TopicReactionRepository
    ){}

    async createTopic(data: ICreateTopic):Promise<Topic>{
        let createdTopic = await this.topicRepo.save(data)
        return createdTopic
    }

    async getTopicReactions(topicId: number):Promise<TTopicReact[]>{
        const topicReacts = await this.topicReactRepo.find({topicId})
        return plainToClass(TTopicReact, topicReacts)
    }

    async getTopicReaction(topicId: number, userId: number):Promise<TTopicReact>{
        const topicReact = await this.topicReactRepo.findOne({topicId, userId})
        return plainToClass(TTopicReact, topicReact)
    }

    async getTopic(topicId: number):Promise<TTopic>{
        const topic = await this.topicRepo.findOne({id: topicId})
        if(!topic)throw new NotFoundException('Topic not found')
        let topicReactions = await this.getTopicReactions(topicId)
        let topic2 = plainToClass(TTopic, topic)
        topicReactions = plainToClass(TTopicReact, topicReactions)
        topic2 = {...topic2, topicReactions: topicReactions}
        return topic2
    }

    async createTopicReact(data: ICreateTopicReact):Promise<TopicReaction>{
        const topicReaction = await this.getTopicReaction(data.topicId, data.userId)
        if(topicReaction) await this.topicReactRepo.delete({topicId: data.topicId, userId: data.userId})
        const createdTopicReact = await this.topicReactRepo.save(data)
        return createdTopicReact
    }

    
}