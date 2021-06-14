import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UseUser } from "../common/decorators/user.decorator";
import { TUser } from "../users/transformers/user.transformer";
import { Comment } from "./entities/comment.entity";
import { CommentService } from "./services/comment.service";
import { TComment } from "./transformers/comment.transformer";

@Controller('comments')
export class CommentController{
    constructor(
        private commentService: CommentService
    ){}
    @UseGuards(AuthGuard('jwt'))
    @Post('topics/:topicId')
    async createComment(
      @UseUser() user: TUser,
      @Body('body') body: string,
      @Param('topicId')topicId: number
    ): Promise<Comment> {
      return this.commentService.createComment({
        userId: user.id,
        body,
        topicId
      })
    }

    @Get('topics/:topicId')
  async getComment(@Param('topicId') topicId: number): Promise<TComment[]> {
    return this.commentService.getCommentsByTopicId(topicId)
  }
}