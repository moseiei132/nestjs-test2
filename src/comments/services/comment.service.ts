import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { async } from "rxjs";
import { Comment } from "../entities/comment.entity";
import { ICreateComment, ICreateCommentReact, IDeleteComment, IUpdateComment } from "../interfaces/comment.interface";
import { CommentReactionRepository } from "../repositories/comment-reaction.repository";
import { CommentRepository } from "../repositories/comment.repository";
import { TComment, TCommentReact, TUpdatedComment } from "../transformers/comment.transformer";

@Injectable()
export class CommentService{
    constructor(
        @InjectRepository(CommentRepository)
        private commentRepo: CommentRepository,
        @InjectRepository(CommentReactionRepository)
        private commentReactRepo: CommentReactionRepository,
    ) { }
    async createComment(data: ICreateComment): Promise<Comment> {
        let createdComment = await this.commentRepo.save(data)
        return createdComment
    }

    async getCommentReactions(commentId: number): Promise<TCommentReact[]> {
        const commentReacts = await this.commentReactRepo.find({commentId})
        return plainToClass(TCommentReact, commentReacts)
    }

    async getCommentsByTopicId(topicId: number): Promise<TComment[]> {
        const comments = await this.commentRepo.find({ where: {topicId, deletedAt: null} , relations: ['commentReactions']})
        if(comments.length === 0) return plainToClass(TComment, comments)
        return plainToClass(TComment, comments)
    }

    async getCommentReaction(
        commentId: number,
        userId: number,
    ): Promise<TCommentReact> {
        const commentReact = await this.commentReactRepo.findOne({ commentId, userId })
        return plainToClass(TCommentReact, commentReact)
    }

    async createCommentReact(data: ICreateCommentReact): Promise<any> {
        const commentReaction = await this.getCommentReaction(data.commentId, data.userId)
        if (commentReaction) {
            const deletedComment = await this.commentReactRepo.delete({
                commentId: data.commentId,
                userId: data.userId,
            })
            if (commentReaction.reaction === data.reaction) return deletedComment
        }
        const createdCommentReact = await this.commentReactRepo.save(data)
        return createdCommentReact
    }

    async updateComment(data: IUpdateComment): Promise<TUpdatedComment> {
        const comment = await this.commentRepo.findOne({ id: data.commentId, deletedAt: null })
        if (!comment) throw new NotFoundException('Topic not found')
        if (comment.userId != data.userId) throw new NotAcceptableException('User not owner')
        comment.body = data.body
        const updatedComment = await this.commentRepo.save(comment)
        return plainToClass(TUpdatedComment, updatedComment)
    }

    async deleteComment(data: IDeleteComment): Promise<TUpdatedComment> {
        const comment = await this.commentRepo.findOne({ id: data.commentId, deletedAt: null })
        if (!comment) throw new NotFoundException('Topic not found')
        if (comment.userId != data.userId) throw new NotAcceptableException('User not owner')
        comment.deletedAt = new Date()
        const updatedComment = await this.commentRepo.save(comment)
        return plainToClass(TUpdatedComment, updatedComment)
    }
}