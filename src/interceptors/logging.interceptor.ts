import { CallHandler, ExecutionContext } from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ILogger } from '../common.interface';

export class CommonLoggingInterceptor {
  constructor(private logger: ILogger) { }
  execute(context: ExecutionContext, next: CallHandler): Observable<any> {
    const pattern = context
      .switchToRpc()
      .getContext<TcpContext>()
      .getPattern();

    let args = null;

    try {
      args = JSON.stringify(context.switchToRpc().getData());
    } catch (error) { }

    const now = Date.now();

    this.logger.log(`incoming for pattern: ${pattern} | args: ${args}`);

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`outgoing for pattern: ${pattern} | time: ${Date.now() - now}ms`);
      })
    );
  }
}
