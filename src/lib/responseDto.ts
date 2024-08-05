
type TStatusCode = 500 | 400 | 200

type Response<T> = {
    data: T | null, 
    successMessage: string | null, 
    statusCode: TStatusCode, 
    errorMessage: string | null
}

export const responseDto = <T> (response: Response<T>) => {
    const { data, successMessage, statusCode, errorMessage} = response
    const isStatusSuccess = () => {
        const statusMap = {
            500: false,
            400: false,
            200: true
        }
        const statusResponse = statusMap[statusCode];

        return statusResponse
    }

    const dto = {
        success: isStatusSuccess(),
        data: data,
        successMessage: successMessage,
        statusCode: statusCode,
        errorMessage: errorMessage
    }

    return dto
}