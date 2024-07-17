 class InternalException extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'InternalException';
        this.statusCode = statusCode;
    }
}

export {InternalException}