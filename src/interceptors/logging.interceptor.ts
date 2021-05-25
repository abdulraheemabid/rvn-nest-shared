import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * This `CommonLoggingInterceptor` can be plugged in any nest app.
 * 
 * This will log the incoming request either http or via tcp and log the response as well. Either successfull or exception
 * 
 * @example
 * This filter can be plugged in nest app's main.ts
 * app.useGlobalInterceptors(new CommonLoggingInterceptor());
 */
@Injectable()
export class CommonLoggingInterceptor implements NestInterceptor {
  private logger = new Logger(CommonLoggingInterceptor.name, true);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    let patternOrURL = "";
    let args = null;

    switch (context.getType()) {
      case "http":
        const request = context.switchToHttp().getRequest()
        patternOrURL = `${request.method}: ${request.url}`;
        args = JSON.stringify(request.body);
        break;

      default:
        patternOrURL = context.switchToRpc().getContext<TcpContext>().getPattern();
        args = JSON.stringify(context.switchToRpc().getData());
        break;
    }

    const now = Date.now();

    this.logger.log(`incoming pattern: ${patternOrURL}`);

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`outgoing pattern: ${patternOrURL} | time: ${Date.now() - now}ms`);
      })
    );
  }
}
