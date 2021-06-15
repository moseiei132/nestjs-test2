import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UserService } from './services/user.service'
import { TUser } from './transformers/user.transformer'

@ApiTags('UserController')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @ApiOkResponse()
  getUsers(): Promise<TUser[]> {
    return this.userService.getUsers()
  }
}
