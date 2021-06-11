import { Exclude } from 'class-transformer'

export class TUser {
  id: number

  username: string

  email: string

  @Exclude()
  password: string

  @Exclude()
  createdAt: Date

  @Exclude()
  updatedAt: Date

  constructor(partial: Partial<TUser>) {
    Object.assign(this, partial)
  }
}
