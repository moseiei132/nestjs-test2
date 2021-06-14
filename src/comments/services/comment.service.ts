import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "../entities/comment.entity";
import { ICreateComment } from "../interfaces/comment.interface";
import { CommentReactionRepository } from "../repositories/comment-reaction.repository";
import { CommentRepository } from "../repositories/comment.repository";

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

}