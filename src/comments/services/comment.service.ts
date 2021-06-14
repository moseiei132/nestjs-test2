import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { Comment } from '../entities/comment.entity'
import {
  ICreateComment,
  ICreateCommentReact,
  IDeleteComment,
  IUpdateComment,
} from '../interfaces/comment.interface'
import { CommentReactionRepository } from '../repositories/comment-reaction.repository'
import { CommentRepository } from '../repositories/comment.repository'
import {
  TComment,
  TCommentReact,
  TUpdatedComment,
} from '../transformers/comment.transformer'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepo: CommentRepository,
    @InjectRepository(CommentReactionRepository)
    private commentReactRepo: CommentReactionRepository,
  ) {}
  createComment(data: ICreateComment): Promise<Comment> {
    return this.commentRepo.save(data)
  }

  async getCommentReactions(commentId: number): Promise<TCommentReact[]> {
    const commentReacts = await this.commentReactRepo.find({ commentId })
    return plainToClass(TCommentReact, commentReacts)
  }

  async getCommentsByTopicId(topicId: number): Promise<TComment[]> {
    const comments = await this.commentRepo.find({
      where: { topicId, deletedAt: null },
      relations: ['commentReactions'],
    })
    if (comments.length === 0) return plainToClass(TComment, comments)
    let comments2 = comments.map((item) => {
      const commentReactions = plainToClass(
        TCommentReact,
        item.commentReactions,
      )
      return { ...item, commentReactions }
    })
    return plainToClass(TComment, comments2)
  }

  async getCommentReaction(
    commentId: number,
    userId: number,
  ): Promise<TCommentReact> {
    const commentReact = await this.commentReactRepo.findOne({
      commentId,
      userId,
    })
    return plainToClass(TCommentReact, commentReact)
  }

  async createCommentReact(data: ICreateCommentReact): Promise<TCommentReact> {
    const commentReaction = await this.getCommentReaction(
      data.commentId,
      data.userId,
    )
    if (commentReaction) {
      await this.commentReactRepo.delete({
        commentId: data.commentId,
        userId: data.userId,
      })
      if (commentReaction.reaction === data.reaction)
        return plainToClass(TCommentReact, {})
    }
    const createdCommentReact = await this.commentReactRepo.save(data)
    return plainToClass(TCommentReact, createdCommentReact)
  }

  async updateComment(data: IUpdateComment): Promise<TUpdatedComment> {
    const comment = await this.commentRepo.findOne({
      id: data.commentId,
      deletedAt: null,
    })
    if (!comment) throw new NotFoundException('Topic not found')
    if (comment.userId != data.userId)
      throw new NotAcceptableException('User not owner')
    const updatedComment = await this.commentRepo.save({...comment, body: data.body})
    return plainToClass(TUpdatedComment, updatedComment)
  }

  async deleteComment(data: IDeleteComment): Promise<TUpdatedComment> {
    const comment = await this.commentRepo.findOne({
      id: data.commentId,
      deletedAt: null,
    })
    if (!comment) throw new NotFoundException('Topic not found')
    if (comment.userId != data.userId)
      throw new NotAcceptableException('User not owner')
    comment.deletedAt = new Date()
    const updatedComment = await this.commentRepo.save(comment)
    return plainToClass(TUpdatedComment, updatedComment)
  }
}
