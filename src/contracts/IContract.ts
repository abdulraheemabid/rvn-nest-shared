export interface IContract {
    serviceName: string,
    modules: {
        [key: string]: {
            [key: string]:{
                service: string,
                module: string,
                method: string
            }
        }
    }
}