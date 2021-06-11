import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from '../users/dtos/user.dto'
import { TUser } from '../users/transformers/user.transformer'
import { LoginDto } from './dtos/auth.dto'
import { IAccessToken } from './interfaces/auth.interface'
import { AuthService } from './services/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() data: LoginDto): Promise<IAccessToken> {
    return this.authService.login({
      username: data.username,
      password: data.password,
    })
  }

  @Post('register')
  register(@Body() data: CreateUserDto): Promise<TUser> {
    return this.authService.register({
      username: data.username,
      email: data.email,
      password: data.password,
    })
  }
}
