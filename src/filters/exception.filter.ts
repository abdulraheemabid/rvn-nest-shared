import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HttpExceptionCustomMessages, IApiResponseWrapper } from '..';

/**
 * Global exception handler for nest microservices or apps.
 * 
 * It is based on the shared `IApiResponseWrapper`.
 * 
 * It will capture the error message if present in the exception, else tries to get error message related to the http status code set, or fallback to `Request unsuccessfull`.
 * 
 * It will figure out if the exception is a http request or nest microservice's RCP exception and act accordingly.
 * 
 * @example
 * Example for plugging in this exception filter in nest app's `main.ts`
 * app.useGlobalFilters(new CommonExceptionFilter()); 
 *  
 */
@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  private logger = new Logger(CommonExceptionFilter.name, true);

  catch(exception: any, host: ArgumentsHost) {

    let message = exception?.error?.message || exception?.response?.message || exception?.message || HttpExceptionCustomMessages[exception?.response?.statusCode] || "Request unsuccessfull";
    const statusCode = exception?.error?.statusCode || exception?.statusCode || exception?.response?.statusCode || 500;

    const responseBody: IApiResponseWrapper = {
      status: "failure",
      data: null,
      message,
      statusCode
    };


    let patternOrURL = "";
    let args = null;

    switch (host.getType()) {

      case "http":

        const request = host.switchToHttp().getRequest()
        const response = host.switchToHttp().getResponse();

        patternOrURL = `${request.method}: ${request.url}`;
        args = JSON.stringify(request.body);

        this.logger.error(`pattern: ${patternOrURL} | statusCode: ${statusCode} | message: ${message}`);

        response.status(statusCode).json(responseBody);

        break;

      default:

        patternOrURL = host
          .switchToRpc()
          .getContext<TcpContext>()
          .getPattern();

        args = JSON.stringify(host.switchToRpc().getData());

        this.logger.error(`pattern: ${patternOrURL} | statusCode: ${statusCode} | message: ${message}`);

        return new Observable(sub => { throw responseBody; });
    }
  }
}
