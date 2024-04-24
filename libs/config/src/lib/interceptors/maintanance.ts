import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, delay, map } from 'rxjs';
import { ConfigService } from '../config.service';
import { ConfigProfile } from '../config-profile';

/**
 * If the profile is Maintanance, then maintanance message will be returned as response.
 * Maintanance message will be retrived form the provided config service.
 */
@Injectable()
export class MaintananceInterceptor implements NestInterceptor<unknown> {
  constructor(private readonly config: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const profile = this.config.profile();
    if (profile === ConfigProfile.MAINTANANCE) {
      return next.handle().pipe(
        delay(2000),
        map(() => {
          return {
            message: this.config.getMessage(ConfigProfile.MAINTANANCE),
          };
        })
      );
    }
    return next.handle();
  }
}
