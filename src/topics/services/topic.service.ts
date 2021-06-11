import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TopicReactionRepository } from "../repositories/topic-reaction.repository";
import { TopicRepository } from "../repositories/topic.repository";

@Injectable()
export class TopicService{
    constructor(
        @InjectRepository(TopicRepository)
        private topicRepo: TopicRepository,
        @InjectRepository(TopicReactionRepository)
        private topicReactRepo: TopicReactionRepository
    ){}
}