import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CommentReaction } from '../../comments/entities/comment-reaction.entity'
import { Comment } from '../../comments/entities/comment.entity'
import { TopicReaction } from '../../topics/entities/topic-reaction.entity'
import { Topic } from '../../topics/entities/topic.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => TopicReaction, (topicReactions) => topicReactions.user)
  topicReactions?: TopicReaction[]

  @OneToMany(() => CommentReaction, (commentReaction) => commentReaction.user)
  commentReactions?: CommentReaction[]

  @OneToMany(() => Topic, (topic) => topic.user)
  topics?: Topic[]

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[]
}
