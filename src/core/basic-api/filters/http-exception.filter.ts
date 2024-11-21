import { Request, Response } from 'express';

import { ConfigService } from '@nestjs/config';
import {
  Catch,
  Logger,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter
} from '@nestjs/common';

import { LogExceptionType } from '../enums';
import { DefaultExceptionResponse } from '../interfaces';

import { ENV_LOG_EXCEPTION_TYPE } from '../../../core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  private logExceptionType: LogExceptionType = new ConfigService().get(
    ENV_LOG_EXCEPTION_TYPE
  );

  catch(ex: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = ex.getStatus();

    const body: DefaultExceptionResponse = {
      method: request.method,
      path: request.url,
      statusCode,
      timestamp: new Date().toISOString()
    };

    const exception = {
      message: ex.message
    };

    const showDetail =
      this.logExceptionType === LogExceptionType.ALL ||
      [
        HttpStatus.BAD_REQUEST,
        HttpStatus.UNAUTHORIZED,
        HttpStatus.FORBIDDEN
      ].includes(statusCode);

    if (showDetail) {
      body.exception = exception;
    }

    response.status(statusCode).json(body);

    body.exception = exception;
    this.logger.error(body);
  }
}
