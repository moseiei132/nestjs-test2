import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(45, {
    message: 'Username is too long',
  })
  @ApiProperty()
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty()
  password: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string
}
