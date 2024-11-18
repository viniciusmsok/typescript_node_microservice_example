import { Connection } from 'mongoose';
import { Logger } from '@nestjs/common';

import {
  HealthCheckStateType,
  HealthCheckItemDTO,
  HealthCheckItemType,
  IHealthCheckService
} from '../basic-api';

import { MongoDBInitService } from './mongo-db-init.service';

jest.mock('mongoose');
jest.mock('@nestjs/common');

describe('MongoDBInitService', () => {
  let mongoDBInitServiceOK: MongoDBInitService;
  let mockConnectionOK: jest.Mocked<Connection>;

  let mongoDBInitServiceFailed: MongoDBInitService;
  let mockConnectionFailed: jest.Mocked<Connection>;

  let mockHealthCheckService: jest.Mocked<IHealthCheckService>;

  beforeEach(() => {
    mockConnectionOK = {
      on: jest.fn(),
      readyState: 1
    } as unknown as jest.Mocked<Connection>;

    mockConnectionFailed = {
      on: jest.fn(),
      readyState: 0
    } as unknown as jest.Mocked<Connection>;

    mockHealthCheckService = {
      addItem: jest.fn()
    } as unknown as jest.Mocked<IHealthCheckService>;

    mongoDBInitServiceOK = new MongoDBInitService(
      mockConnectionOK,
      mockHealthCheckService
    );

    mongoDBInitServiceFailed = new MongoDBInitService(
      mockConnectionFailed,
      mockHealthCheckService
    );
  });

  describe('constructor', () => {
    it('should subscribe to MongoDB connection events', () => {
      expect(mockConnectionOK.on).toHaveBeenCalledWith(
        'connected',
        expect.any(Function)
      );
      expect(mockConnectionOK.on).toHaveBeenCalledWith(
        'error',
        expect.any(Function)
      );
      expect(mockConnectionOK.on).toHaveBeenCalledWith(
        'disconnected',
        expect.any(Function)
      );
    });
  });

  describe('onModuleInit', () => {
    it('should register itself as a health check item', async () => {
      await mongoDBInitServiceOK.onModuleInit();

      expect(mockHealthCheckService.addItem).toHaveBeenCalledWith(
        mongoDBInitServiceOK
      );
    });
  });

  describe('checkItem', () => {
    it('should return UP if MongoDB is connected', async () => {
      const result: HealthCheckItemDTO = await mongoDBInitServiceOK.checkItem();

      expect(result).toEqual({
        type: HealthCheckItemType.DATABASE,
        name: expect.any(String),
        state: HealthCheckStateType.UP
      });
    });

    it('should return DOWN if MongoDB is not connected', async () => {
      const result: HealthCheckItemDTO =
        await mongoDBInitServiceFailed.checkItem();

      expect(result).toEqual({
        type: HealthCheckItemType.DATABASE,
        name: expect.any(String),
        state: HealthCheckStateType.DOWN
      });
    });

    it('should log an error if MongoDB is not connected', async () => {
      const mockLoggerError = jest
        .spyOn(Logger.prototype, 'error')
        .mockImplementation();

      await mongoDBInitServiceFailed.checkItem();

      expect(mockLoggerError).toHaveBeenCalledWith(
        'MongoDB connection error',
        expect.any(Error)
      );
    });
  });
});
