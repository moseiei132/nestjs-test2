import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../users/repositories/user.repository";
import { UserService } from "../users/services/user.service";
import { UserModule } from "../users/user.module";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./services/auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule,
        ConfigModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.secret'),
                signOptions: {
                    expiresIn: configService.get<string>('jwt.expire'),
                },
            }),
            inject: [ConfigService],
        })
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [
        AuthService,
        PassportModule,
        JwtModule,
        JwtStrategy
    ]
})
export class AuthModule { }