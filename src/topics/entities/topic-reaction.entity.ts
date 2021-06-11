import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { User } from '../../users/entities/user.entity'
import { Topic } from './topic.entity'

@Entity('topics_reactions')
export class TopicReaction {
  @PrimaryColumn({ name: 'user_id' })
  userId: number

  @PrimaryColumn({ name: 'topic_id' })
  topicId: number

  @Column()
  reaction: string

  @ManyToOne(() => User, (user) => user.topicReactions)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @ManyToOne(() => Topic, (topic) => topic.topicReactions)
  @JoinColumn({ name: 'topic_id' })
  topic?: Topic
}
