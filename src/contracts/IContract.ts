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