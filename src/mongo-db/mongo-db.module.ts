import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ConfigModule,
  ConfigService
} from '@nestjs/config';

import { MongoDBInitService } from './mongo-db-init.service';
import { MongoDBProviderTokens } from './mongo-db-provider-tokens.enum';

import { BasicAPIModule } from '../basic-api';
import { ENVIRONMENT_MONGODB_MAIN_DATABASE_URI } from '../core';

@Module({
  imports: [
    ConfigModule,
    BasicAPIModule,

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(ENVIRONMENT_MONGODB_MAIN_DATABASE_URI),
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000
      }),
      inject: [ConfigService]
    })
  ],

  providers: [
    ConfigService,
    {
      provide: MongoDBProviderTokens.MONGO_DB_INIT_SERVICE,
      useClass: MongoDBInitService
    }    
  ],

  exports: [
    MongoDBProviderTokens.MONGO_DB_INIT_SERVICE
  ]
})
export class MongoDBModule {}
