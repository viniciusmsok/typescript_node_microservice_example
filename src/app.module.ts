import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { TenantModule } from './features';
import { AppController } from './app.controller';

import {
  MongoDBModule,
  BasicAPIModule,
  createEnvironment,
  OtherExceptionFilter
} from './core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: createEnvironment
    }),

    BasicAPIModule,
    MongoDBModule,
    TenantModule
  ],

  controllers: [AppController],

  providers: [
    {
      provide: APP_FILTER,
      useClass: OtherExceptionFilter
    }
  ]
})
export class AppModule {}
