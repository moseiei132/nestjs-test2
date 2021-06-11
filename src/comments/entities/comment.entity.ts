import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Topic } from '../../topics/entities/topic.entity'
import { User } from '../../users/entities/user.entity'
import { CommentReaction } from './comment-reaction.entity'

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'topic_id' })
  topicId: number

  @Column({ name: 'user_id' })
  userId: number

  @Column()
  body: string

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @Column({ name: 'deleted_at' })
  deletedAt: Date

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @ManyToOne(() => Topic, (topic) => topic.comments)
  @JoinColumn({ name: 'topic_id' })
  topic?: Topic

  @OneToMany(
    () => CommentReaction,
    (commentReactions) => commentReactions.comment,
  )
  commentReactions?: CommentReaction[]
}
