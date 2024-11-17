import { Module } from '@nestjs/common';

import {
  ConfigModule,
  ConfigService
} from '@nestjs/config';

import { EnvironmentService } from './environment';
import { BasicAPIProviderTokens } from './basic-api-provider-tokens.enum';

import {
  HealthCheckService,
  HealthCheckController
} from './health-check';

@Module({
  imports: [
    ConfigModule
  ],

  controllers: [HealthCheckController],

  providers: [
    ConfigService,
    {
      provide: BasicAPIProviderTokens.HEALTH_CHECK_SERVICE_TOKEN,
      useClass: HealthCheckService
    },
    {
      provide: BasicAPIProviderTokens.ENVIRONMENT_SERVICE_TOKEN,
      useClass: EnvironmentService
    }
  ],

  exports: [
    BasicAPIProviderTokens.HEALTH_CHECK_SERVICE_TOKEN,
    BasicAPIProviderTokens.ENVIRONMENT_SERVICE_TOKEN
  ]
})
export class BasicAPIModule {}
