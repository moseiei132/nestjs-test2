import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../../users/repositories/user.repository";
import { IAccessToken, ILogin, IRegister } from "../interfaces/auth.interface";
import * as bcrypt from 'bcrypt'
import { TUser } from "../../users/transformers/user.transformer";
import { plainToClass } from "class-transformer";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserRepository)
        private userRepo: UserRepository,
    ){}
    async login(data: ILogin): Promise<IAccessToken> {
        const user = await this.userRepo.findOne({ username: data.username })
        if (!user) throw new UnauthorizedException('User does not exist')
        const isMatch = await bcrypt.compare(data.password, user.password)
        if (!isMatch) throw new UnauthorizedException('Invalid password')
        return {
          accessToken: this.jwtService.sign({
            id: user.id,
            username: data.username,
          }),
        }
      }
    
      async register(userData: IRegister): Promise<TUser> {
        userData.password = await bcrypt.hash(userData.password, 10)
        return plainToClass(TUser, await this.userRepo.save(userData)) 
      }
}