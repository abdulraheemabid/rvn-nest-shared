import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { IApiResponseWrapper } from '../common.interface';


/**
 * This `CommonResponseWrapperInterceptor` wraps the response to `IApiResponseWrapper`
 * 
 * By using this, all nest apps and microservices using this interceptor will have a standart response structure
 * 
 * @example
 * This interceptor can be plugged in nest app's main.ts
 * app.useGlobalInterceptors(new CommonResponseWrapperInterceptor());
 */
@Injectable()
export class CommonResponseWrapperInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {

        if (data.status !== undefined
          && data.data !== undefined
          && data.message !== undefined
          && data.statusCode !== undefined) {
          return data;
        }

        const resp: IApiResponseWrapper = {
          status: "success",
          data,
          message: null,
          statusCode: HttpStatus.OK
        }

        return resp;
      })
    );
  }
}
