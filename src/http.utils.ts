export class HttpExceptionCustomMessages {
    static readonly 404 = "Not found";
    static readonly 401 = "Bad request";
    static readonly 500 = "Internal server error";
}

export enum HttpVerbs {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    TRACE = 'TRACE',
    OPTIONS = 'OPTIONS',
    CONNECT = 'CONNECT'
}