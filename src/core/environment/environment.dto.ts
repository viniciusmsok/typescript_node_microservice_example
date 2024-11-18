import {
  Min,
  IsEnum,
  IsNumber,
  IsString,
  IsNotEmpty,
} from 'class-validator';

import * as env from './environment.const';
import { NodeEnv } from './node-env.enum';


export class EnvironmentDTO {
  @IsEnum(NodeEnv)
  @IsNotEmpty()
  [env.ENVIRONMENT_NODE_ENV]: NodeEnv;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  [env.ENVIRONMENT_PORT]: number;

  @IsString()
  @IsNotEmpty()
  [env.ENVIRONMENT_MONGODB_MAIN_DATABASE_URI]: string;
}
