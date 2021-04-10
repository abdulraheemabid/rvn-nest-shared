export interface IApiResponseWrapper {
    status: "success" | "failure";
    data: any;
    message: string;
}