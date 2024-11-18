import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

import {
  Inject,
  Logger,
  OnModuleInit
} from '@nestjs/common';

import {
  HealthCheckItemDTO,
  HealthCheckItemType,
  IHealthCheckService,
  HealthCheckStateType,
  BasicAPIProviderTokens,
  IHealthCheckItemService
} from '../basic-api';

import { APPLICATION_MAIN_DB_CONNECTION } from '../core';

export class MongoDBInitService implements
  OnModuleInit,
  IHealthCheckItemService
{
  private readonly logger = new Logger(MongoDBInitService.name);

  constructor(
    @InjectConnection()
    private readonly conn: Connection,
    
    @Inject(BasicAPIProviderTokens.HEALTH_CHECK_SERVICE_TOKEN)
    private readonly healthCheckService: IHealthCheckService
  ) {
    conn.on('connected', () => {
      this.logger.log('MongoDB connected');
    });

    conn.on('error', (err) => {
      this.logger.error('MongoDB connection error', err);
    });

    conn.on('disconnected', () => {
      this.logger.log('MongoDB disconnected');
    });
  }

  async onModuleInit(): Promise<void> {
    this.healthCheckService.addItem(this);
  }

  async checkItem(): Promise<HealthCheckItemDTO> {
    const result : HealthCheckItemDTO = {
      type: HealthCheckItemType.DATABASE,
      name: APPLICATION_MAIN_DB_CONNECTION,
      state: HealthCheckStateType.UP
    }

    try {
      if (this.conn.readyState !== 1) {
        throw new Error('Connection undefined');
      }
    }
    catch(e) {
      result.state = HealthCheckStateType.DOWN;
      this.logger.error('MongoDB connection error', e);
    }

    return result;
  }
}