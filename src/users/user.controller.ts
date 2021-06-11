import { Controller, Get } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { TUser } from "./transformers/user.transformer";

@Controller('users')
export class UserController{
    constructor(
        private userService: UserService
    ){}
    @Get()
    getUsers(): Promise<TUser[]>{
        return this.userService.getUsers()
    }
}