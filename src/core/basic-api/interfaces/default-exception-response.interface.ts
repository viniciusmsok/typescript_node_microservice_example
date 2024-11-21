export interface DefaultExceptionResponse {
  method: string;
  path: string;
  statusCode: number;
  exception?: unknown;
  timestamp: Date | string;
}
