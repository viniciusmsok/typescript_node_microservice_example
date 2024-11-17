import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';

import {
  BasicAPIModule,
  OtherExceptionFilter
} from './basic-api';

@Module({
  imports: [
    BasicAPIModule
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
