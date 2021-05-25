/**
 * All responses containing data from DB contains these properties
 */
export interface BaseResponseDTO {
    id?: number;
    createdOn?: Date;
    createdById?: number;
    updatedOn?: Date;
    updatedById?: number;
    deletedOn?: Date;
}

/**
 * All services using the `CommonResponseWrapperInterceptor` 
 * will produce response following this interface
 */
export interface IApiResponseWrapper {
    status: "success" | "failure";
    statusCode: number,
    data: any;
    message: string;
}

/**
 * If custom logger is defined, It should implement this interface 
 */
export interface ILogger {
    log(message: any, context?: string): any;
    error(message: any, trace?: string, context?: string): any;
    warn(message: any, context?: string): any;
    debug?(message: any, context?: string): any;
    verbose?(message: any, context?: string): any;
}

export interface IContractMessages {
    serviceName: string,
    modules: {
        [key: string]: {
            [key: string]: {
                service: string,
                module: string,
                method: string
            }
        }
    }
}

export interface ICustomException {
    message: string,
    statusCode: number
}

export interface GenericObject {
    [key: string]: any;
}