import { Request, Response } from 'express';

import {
  Catch,
  Logger,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter
} from '@nestjs/common';

import { DefaultExceptionResponse } from './default-exception-response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();

    const safeResponse = [
      HttpStatus.BAD_REQUEST,
      HttpStatus.UNAUTHORIZED,
      HttpStatus.FORBIDDEN
    ].includes(statusCode);

    const body: DefaultExceptionResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      bodyMessage: safeResponse ? response : undefined
    };

    this.logger.error(exception);

    response.status(statusCode).json(body);
  }
}
