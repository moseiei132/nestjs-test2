import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserRepository } from 'src/users/repositories/user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { IUser } from '../users/interfaces/user.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('jwt.secret'),
    })
  }

  async validate(payload: IUser): Promise<IUser> {
    const user = this.userRepo.findOne({
      id: payload.id,
      username: payload.username,
    })
    if (user) return { id: payload.id, username: payload.username }
    throw new UnauthorizedException('Invalid token')
  }
}
