import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { MongoDBModule } from './mongo-db';
import { createEnvironment } from './core';

import {
  BasicAPIModule,
  OtherExceptionFilter
} from './basic-api';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: createEnvironment
    }),

    BasicAPIModule,
    MongoDBModule    
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
