import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, body, url, ip } = request;
    return next.handle().pipe(
      tap({
        error: (exception) => {
          Logger.error(
            `An error has occurred while handling an HTTP Request ${method} ${url} - ${exception.name}`,
            exception
          );

          Sentry.withScope((scope) => {
            scope.setExtra('body', body);
            scope.setExtra('method', method);
            scope.setExtra('url', url);
            scope.setExtra('ip', ip);
            scope.setLevel('error');
            scope.setTransactionName('HTTP Interceptor');

            exception.name = `${method} ${url} - ${exception.name}`;
            Sentry.captureException(exception);
          });
        },
      })
    );
  }
}
