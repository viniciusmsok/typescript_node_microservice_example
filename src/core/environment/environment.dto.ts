import { Min, IsEnum, IsNumber, IsString, IsNotEmpty } from 'class-validator';

import * as env from './environment.const';
import { NodeEnv } from './node-env.enum';

import { LogExceptionType } from '../basic-api';

export class EnvironmentDTO {
  @IsEnum(NodeEnv)
  @IsNotEmpty()
  [env.ENV_NODE_ENV]: NodeEnv;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  [env.ENV_PORT]: number;

  @IsString()
  @IsNotEmpty()
  [env.ENV_MONGODB_MAIN_DATABASE_URI]: string;

  @IsEnum(LogExceptionType)
  @IsNotEmpty()
  [env.ENV_LOG_EXCEPTION_TYPE]: LogExceptionType;
}
