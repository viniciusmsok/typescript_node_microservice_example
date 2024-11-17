import { Response } from 'express';

export interface DefaultExceptionResponse {
  statusCode: number,
  timestamp: Date | string,
  path: string,
  bodyMessage?: Response | string
};
