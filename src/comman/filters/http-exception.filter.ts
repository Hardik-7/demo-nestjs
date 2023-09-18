import { ArgumentsHost, ExceptionFilter, HttpException, Catch, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        // throw new Error("Method not implemented")
        const ctx = host.switchToHttp()
        const req = ctx.getRequest<Request>()
        const res = ctx.getResponse<Response>()
        const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        const message = exception instanceof HttpException ?  exception.message || exception.message : 'Internal server error'

        const devErrorResponse: any = {
            statusCode,
            timestamp: new Date().toISOString(),
            path: req.url,
            method: req.method,
            errorName: exception?.name,
            message: exception?.message
        }
      
        const prodErrorResponse: any = {
            statusCode,
            message
        }
        return res.status(statusCode).json(process.env.NODE_ENV === 'development'? devErrorResponse: prodErrorResponse)

    }
}