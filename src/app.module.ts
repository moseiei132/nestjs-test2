import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import databaseConfig from '../config/database.config'
import commonConfig from '../config/common.config'
import jwtConfig from '../config/jwt.config'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './users/user.module'
import { AuthModule } from './auth/auth.module'
import { TopicModule } from './topics/topic.module'
import { CommentModule } from './comments/comment.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, commonConfig, jwtConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    TopicModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
