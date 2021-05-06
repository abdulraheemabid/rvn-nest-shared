import { catchError, map, timeout } from 'rxjs/operators';
import { IApiResponseWrapper } from '../common.interface';

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