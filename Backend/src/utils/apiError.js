class apiError extends Error{
    constructor(
        message="",
        statusCode=0,
        error={}
    ){
        super(message),
        this.statusCode=statusCode,
        this.message=message
        this.error=error
    }
}

export default apiError