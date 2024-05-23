export interface APISuccessResponseInterface {
    data: unknown;
    message: string;
    statusCode: number;
    success: boolean;
}

class ApiResponse implements APISuccessResponseInterface {
    data: unknown;
    message: string;
    statusCode: number;
    success: boolean;

    constructor(statusCode: number, data: unknown, message: string = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse }