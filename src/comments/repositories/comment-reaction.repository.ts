import { EntityRepository, Repository } from 'typeorm'
import { CommentReaction } from '../entities/comment-reaction.entity'

@EntityRepository(CommentReaction)
export class CommentReactionRepository extends Repository<CommentReaction> {}
