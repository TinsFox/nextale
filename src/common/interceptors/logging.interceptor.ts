import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(LoggingInterceptor.name, {
      timestamp: true,
    });
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const call$ = next.handle();
    const request = context.switchToHttp().getRequest();
    const content = `${request.method} ${request.url}`;
    this.logger.debug(`--> 收到请求 ${content} ${Date.now() - now}ms`);
    return call$.pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const method = response.req.method;
        const url = response.req.originalUrl;
        this.logger.debug(
          `<--- 响应请求 ${method} ${url} ${statusCode} ${Date.now() - now}ms`,
        );
      }),
    );
  }
  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request;
  }
}
