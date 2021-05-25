import { catchError, map, timeout } from 'rxjs/operators';
import { IApiResponseWrapper } from '../common.interface';


/**
 * `MSCLient` class contains the actual call to other microservice. Ideally if all microservices are following the client pattern,
 * they will not have to use this class and this logic will be abstracted for them.
 * 
 * This class uses the passed in `clientProxy` and calls the `send` method with the message pattern and payload and returns the response. 
 * Also configures the passed in timeout
 */
export class MSClient {
    constructor(private client, private logger, private timeoutInMs: number) { }

    send(pattern: any, args: any) {
        //TODO: temp
        if (args.request) args.request = {};

        this.logger.log(`Calling RVN_MS_CLIENT | pattern: ${JSON.stringify(pattern)}`);
        return this.client.send(pattern, args)
            .pipe(
                map((resp: IApiResponseWrapper) => {
                    return resp.data;
                }),
                catchError(err => {
                    this.logger.error(`exception RVN_MS_CLIENT | pattern: ${JSON.stringify(pattern)}`);
                    throw err;
                }),
                timeout(this.timeoutInMs)
            )
            .toPromise();
    }
}