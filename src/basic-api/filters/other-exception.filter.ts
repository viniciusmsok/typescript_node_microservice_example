import { Response } from 'express';

import {
  Catch,
  Logger,
  HttpStatus,
  HttpException,
  ArgumentsHost,
  ExceptionFilter
} from '@nestjs/common';

import { DefaultExceptionResponse } from './default-exception-response.interface';

@Catch()
export class OtherExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(OtherExceptionFilter.name);

  async catch(exception: any, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.logger.error(exception);

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const safeResponse = [
      HttpStatus.BAD_REQUEST,
      HttpStatus.UNAUTHORIZED,
      HttpStatus.FORBIDDEN
    ].includes(statusCode);

    const responseStr: string = Array.isArray(exception?.response?.message)
      ? exception?.response?.message
      : [exception?.response?.message || exception.message].join('. ');

    const body: DefaultExceptionResponse = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      bodyMessage: safeResponse ? responseStr : undefined
    };

    response.status(statusCode).json(body);
  }
}
