export interface APISuccessResponseInterface {
    data: unknown;
    message: string;
    statusCode: number;
    success: boolean;
    actions: String[] | undefined;
    isOwner: boolean | undefined;
}

class ApiResponse implements APISuccessResponseInterface {
    data: unknown;
    message: string;
    statusCode: number;
    success: boolean;
    actions: String[] | undefined;
    isOwner: boolean | undefined;

    constructor(statusCode: number, data: unknown, message: string = "Success", actions?:String[], isOwner?:boolean) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
        if(actions){
            this.data = {data, actions, isOwner: isOwner};
        }

    }
}

export { ApiResponse }
