import { catchError, map, timeout } from 'rxjs/operators';
import { IApiResponseWrapper } from '../common.interface';

export class MSClient {
    constructor(private client, private logger, private timeoutInMs: number) { }

    send(pattern: any, args: any) {
        //TODO: temp
        if (args.request) args.request = {};

        this.logger.log(`Calling RVN_MS_CLIENT | pattern: ${JSON.stringify(pattern)} | args: ${JSON.stringify(args)}`);
        return this.client.send(pattern, args)
            .pipe(
                map((resp: IApiResponseWrapper) => {
                    return resp.data;
                }),
                catchError(err => {
                    this.logger.error(`RVN_MS_CLIENT threw an exception | pattern: ${JSON.stringify(pattern)} | args: ${JSON.stringify(args)}`);
                    throw err;
                }),
                timeout(this.timeoutInMs)
            )
            .toPromise();
    }
}