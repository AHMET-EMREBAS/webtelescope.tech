import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, delay } from 'rxjs';
import { ConfigService } from '../config.service';
import { ConfigProfile } from '../config-profile';

@Injectable()
export class SlowInterceptor implements NestInterceptor<unknown> {
  constructor(private readonly config: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const profile = this.config.profile();
    if (profile === ConfigProfile.SLOW) {
      return next.handle().pipe(delay(20000));
    }
    return next.handle();
  }
}
