import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { IApiResponseWrapper, ILogger } from '../common.interface';
import { HttpExceptionCustomMessages } from '../http.utils';

export class UnhandledExceptionFilter implements ExceptionFilter {

  constructor(private logger: ILogger) { }

  catch(exception: any, host: ArgumentsHost) {

    let message = exception?.error?.message || exception?.response?.message || exception?.message || HttpExceptionCustomMessages[exception?.response?.statusCode] || "Request unsuccessfull";
    const statusCode = exception?.error?.statusCode || exception?.statusCode || exception?.response?.statusCode || 500;

    const pattern = host
      .switchToRpc()
      .getContext<TcpContext>()
      .getPattern();

    let args = null;

    try {
      args = JSON.stringify(host.switchToRpc().getData());
    } catch (error) { }


    const response: IApiResponseWrapper = {
      status: "failure",
      data: null,
      message,
      statusCode
    };

    this.logger.error(`failed: outgoing for pattern: ${pattern} | args: ${args}`);

    return new Observable(sub => { throw response; });
  }
}
