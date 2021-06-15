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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UseUser } from '../common/decorators/user.decorator'
import { TUser } from '../users/transformers/user.transformer'
import { Comment } from './entities/comment.entity'
import { CommentService } from './services/comment.service'
import {
  TComment,
  TCommentReact,
  TUpdatedComment,
} from './transformers/comment.transformer'

@ApiTags('CommentController')
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('topics/:topicId')
  @ApiCreatedResponse()
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
  @ApiOkResponse()
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
  @ApiOkResponse()
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
  @ApiCreatedResponse()
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
  @ApiOkResponse()
  async getComment(@Param('topicId') topicId: number): Promise<TComment[]> {
    return this.commentService.getCommentsByTopicId(topicId)
  }
}
