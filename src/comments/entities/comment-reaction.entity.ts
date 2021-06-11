import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Comment } from "../../comments/entities/comment.entity";

@Entity('comments_reactions')
export class CommentReaction{
    @PrimaryColumn({name: 'comment_id'})
    commentId: number

    @PrimaryColumn({name: 'user_id'})
    userId: number

    @Column()
    reaction: string

    @ManyToOne(()=>User, (user)=>user.commentReactions)
    @JoinColumn({name: 'user_id'})
    user?: User

    @ManyToOne(()=>Comment, (comment)=>comment.commentReactions)
    @JoinColumn({name: 'comment_id'})
    comment?: Comment
}