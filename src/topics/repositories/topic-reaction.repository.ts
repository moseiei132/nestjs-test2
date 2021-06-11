import { EntityRepository, Repository } from 'typeorm'
import { TopicReaction } from '../entities/topic-reaction.entity'

@EntityRepository(TopicReaction)
export class TopicReactionRepository extends Repository<TopicReaction> {}
