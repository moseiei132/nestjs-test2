import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { TopicReaction } from "./topic-reaction.entity";

@Entity('topics')
export class Topic{
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'user_id'})
    userId: number

    @Column()
    name: string

    @Column()
    body: string

    @Column({name: 'created_at'})
    createdAt: Date

    @Column({ name: 'updated_at' })
    updatedAt: Date

    @Column({ name: 'deleted_at' })
    deletedAt: Date

    @ManyToOne(()=>User, (user)=>user.topics)
    @JoinColumn({name: 'user_id'})
    user?: User

    @OneToMany(() => Comment, (comment)=>comment.topic)
    comments?: Comment[]

    @OneToMany(() => TopicReaction, (topicReactions)=>topicReactions.topic)
    topicReactions?: TopicReaction[]
}