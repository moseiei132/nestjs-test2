import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { async } from "rxjs";
import { Comment } from "../entities/comment.entity";
import { ICreateComment } from "../interfaces/comment.interface";
import { CommentReactionRepository } from "../repositories/comment-reaction.repository";
import { CommentRepository } from "../repositories/comment.repository";
import { TComment, TCommentReact } from "../transformers/comment.transformer";

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
}