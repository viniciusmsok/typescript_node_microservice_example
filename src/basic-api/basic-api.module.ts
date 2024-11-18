import { Module } from '@nestjs/common';

import {
  ConfigModule,
  ConfigService
} from '@nestjs/config';

import { HealthCheckService } from './services';
import { BasicAPIProviderTokens } from './enums';

@Module({
  imports: [
    ConfigModule
  ],

  providers: [
    ConfigService,
    {
      provide: BasicAPIProviderTokens.HEALTH_CHECK_SERVICE_TOKEN,
      useClass: HealthCheckService
    }
  ],

  exports: [
    BasicAPIProviderTokens.HEALTH_CHECK_SERVICE_TOKEN
  ]
})
export class BasicAPIModule {}
