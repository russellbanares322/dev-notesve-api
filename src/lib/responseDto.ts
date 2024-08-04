type Response<T> = {
    success: boolean, 
    data: T | null, 
    successMessage: string | null, 
    statusCode: number, 
    errorMessage: string | null
}

export const responseDto = <T> (response: Response<T>) => {
    const {success, data, successMessage, statusCode, errorMessage} = response
    
    const dto = {
        success: success,
        data: data,
        successMessage: successMessage,
        statusCode: statusCode,
        errorMessage: errorMessage
    }

    return dto
}