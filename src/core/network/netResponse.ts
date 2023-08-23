class NetResponse {
    success: boolean;
    data: any;
    message : string
    constructor(success : boolean, data : any, Message : string) {
        this.success  = success;
        this.data = data;
        this.message = Message;
    }
}

export default NetResponse;