import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, delay } from 'rxjs';
import {
  InjectProfileConfigService,
  IProfileConfigService,
  Profile,
} from '../profile';

@Injectable()
export class SlowInterceptor implements NestInterceptor<unknown> {
  constructor(
    @InjectProfileConfigService() private readonly config: IProfileConfigService
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const profile = this.config.getOrThrow(Profile.PROFILE);
    if (profile === Profile.SLOW) {
      return next.handle().pipe(delay(20000));
    }
    return next.handle();
  }
}
