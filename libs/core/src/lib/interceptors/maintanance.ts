import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, delay, map } from 'rxjs';
import {
  InjectProfileConfigService,
  IProfileConfigService,
  Profile,
} from '../profile';

@Injectable()
export class MaintananceInterceptor implements NestInterceptor<unknown> {
  constructor(
    @InjectProfileConfigService() private readonly config: IProfileConfigService
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const profile = this.config.getOrThrow(Profile.PROFILE);
    if (profile === Profile.MAINTANANCE) {
      return next.handle().pipe(
        delay(2000),
        map(() => {
          return {
            message: this.config.getMessage(Profile.MAINTANANCE),
          };
        })
      );
    }
    return next.handle();
  }
}
