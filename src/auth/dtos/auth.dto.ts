import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(45, {
    message: 'Username is too long',
  })
  @ApiProperty()
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string
}
