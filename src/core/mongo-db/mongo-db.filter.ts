import { MongoError } from 'mongodb';
import { ConfigService } from '@nestjs/config';

import {
  Catch,
  Logger,
  HttpStatus,
  ArgumentsHost,
  ExceptionFilter
} from '@nestjs/common';

import { ENV_LOG_EXCEPTION_TYPE } from '../environment';
import { DefaultExceptionResponse, LogExceptionType } from '../basic-api';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MongoExceptionFilter.name);

  private logExceptionType: LogExceptionType = new ConfigService().get(
    ENV_LOG_EXCEPTION_TYPE
  );

  catch(ex: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const statusCode = HttpStatus.BAD_REQUEST;

    const exception = {
      code: ex.code,
      message: this.decodeMongoErrorCode(ex.code),
      detail: undefined
    };

    const body: DefaultExceptionResponse = {
      method: request.method,
      path: request.url,
      statusCode,
      exception,
      timestamp: new Date().toISOString()
    };

    if (this.logExceptionType === LogExceptionType.ALL) {
      exception.detail = ex.message;
    }

    response.status(statusCode).json(body);

    this.logger.error(body);
  }

  private decodeMongoErrorCode(code: string | number): string {
    switch (code) {
      case 11000:
      case 11001:
        return 'Duplicate Key';

      case 26:
        return 'Namespace Not Found';

      case 50:
        return 'Exceeded Time Limit';

      case 59:
        return 'Command Not Found';

      case 121:
        return 'Document Validation Failure';

      case 125:
        return 'Bad Write Concern';

      case 131:
        return 'BackgroundOperationInProgressForNamespace';

      case 167:
        return 'OperationNotSupportedInTransaction';

      case 8000:
        return 'AtlasClusterMaintenance';

      case 18:
        return 'Authentication Failed';

      case 13:
        return 'Unauthorized';

      case 85:
        return 'IndexOptionsConflict';

      case 86:
        return 'IndexNotFound';

      case 112:
        return 'Write Conflict';

      case 91:
        return 'ShutdownInProgress';

      case 6:
        return 'Host Unreachable';

      default:
        return 'Undefined mongoDB error';
    }
  }
}
