import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  statusCode: number
  message: string
  data: T
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Promise<Response<T>>>
{
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Promise<Response<T>>>> {
    return next.handle().pipe(
      map(async (data) => {
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          timestamp: new Date().toLocaleDateString(),
          message: data?.message,
          data: data?.message ? null : data ? data : null,
          length: data?.length || 0,
        }
      }),
    )
  }
}
