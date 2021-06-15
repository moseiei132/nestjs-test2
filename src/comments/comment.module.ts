import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TopicRepository } from '../topics/repositories/topic.repository'
import { CommentController } from './comment.controller'
import { CommentReactionRepository } from './repositories/comment-reaction.repository'
import { CommentRepository } from './repositories/comment.repository'
import { CommentService } from './services/comment.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentReactionRepository, CommentRepository, TopicRepository]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
