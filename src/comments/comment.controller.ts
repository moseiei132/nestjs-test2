import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UseUser } from '../common/decorators/user.decorator'
import { TUser } from '../users/transformers/user.transformer'
import { Comment } from './entities/comment.entity'
import { CommentService } from './services/comment.service'
import {
  TComment,
  TCommentReact,
  TUpdatedComment,
} from './transformers/comment.transformer'

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('topics/:topicId')
  async createComment(
    @UseUser() user: TUser,
    @Body('body') body: string,
    @Param('topicId') topicId: number,
  ): Promise<Comment> {
    return this.commentService.createComment({
      userId: user.id,
      body,
      topicId,
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:commentId')
  async updateTopic(
    @UseUser() user: TUser,
    @Param('commentId') commentId: number,
    @Body('body') body: string,
  ): Promise<TUpdatedComment> {
    return this.commentService.updateComment({
      userId: user.id,
      commentId,
      body,
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:commentId')
  async deleteTopic(
    @UseUser() user: TUser,
    @Param('commentId') commentId: number,
  ): Promise<TUpdatedComment> {
    return this.commentService.deleteComment({
      userId: user.id,
      commentId,
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:commentId')
  async createCommentReact(
    @UseUser() user: TUser,
    @Param('commentId') commentId: number,
    @Body('reaction') reaction: string,
  ): Promise<TCommentReact> {
    return this.commentService.createCommentReact({
      userId: user.id,
      commentId,
      reaction,
    })
  }

  @Get('topics/:topicId')
  async getComment(@Param('topicId') topicId: number): Promise<TComment[]> {
    return this.commentService.getCommentsByTopicId(topicId)
  }
}
