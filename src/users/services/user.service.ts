import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepo: UserRepository
    ){}
    async getUsers(): Promise<User[]>{
        const users = this.userRepo.find()
        if((await users).length === 0)throw new NotFoundException
        return users
    }
}