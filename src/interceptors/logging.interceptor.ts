import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CommonLoggingInterceptor implements NestInterceptor {
  private logger = new Logger(CommonLoggingInterceptor.name);
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

    this.logger.log(`incoming for pattern: ${patternOrURL} | args: ${args}`);

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`outgoing for pattern: ${patternOrURL} | time: ${Date.now() - now}ms`);
      })
    );
  }
}
