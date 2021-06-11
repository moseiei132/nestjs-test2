import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { UserRepository } from '../repositories/user.repository'
import { TUser } from '../transformers/user.transformer'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {}

  async getUsers(): Promise<TUser[]> {
    const users = await this.userRepo.find()
    return plainToClass(TUser, users)
  }

  async getUserById(userId: number): Promise<TUser> {
    const user = await this.userRepo.findOne({ id: userId })
    return plainToClass(TUser, user)
  }

  async getUserByUsername(username: string): Promise<TUser> {
    const user = await this.userRepo.findOne({ username })
    return plainToClass(TUser, user)
  }

  async getUserByEmail(email: string): Promise<TUser> {
    const user = await this.userRepo.findOne({ email })
    return plainToClass(TUser, user)
  }
}
