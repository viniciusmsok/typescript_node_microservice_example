import { Connection } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { MongoDBInitService } from './mongo-db-init.service';

import { BasicAPIProviderTokens, IHealthCheckService } from '../basic-api';

describe('MongoDBInitService', () => {
  let service: MongoDBInitService;
  let mockHealthCheckService: Partial<IHealthCheckService>;

  const mockConnectionSuccess: Partial<Connection> = {
    on: jest.fn(),
    get readyState() {
      return 1;
    }
  };

  const mockConnectionFailure: Partial<Connection> = {
    on: jest.fn(),
    get readyState() {
      return 0;
    }
  };

  beforeEach(async () => {
    mockHealthCheckService = {
      addItem: jest.fn()
    };
  });

  it('should be defined with successful connection', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoDBInitService,
        {
          provide: 'DatabaseConnection',
          useValue: mockConnectionSuccess
        },
        {
          provide: BasicAPIProviderTokens.HEALTH_CHECK_SERVICE_TOKEN,
          useValue: mockHealthCheckService
        }
      ]
    }).compile();

    service = module.get<MongoDBInitService>(MongoDBInitService);
    expect(service).toBeDefined();
  });

  it('should return state UP with active connection', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoDBInitService,
        {
          provide: 'DatabaseConnection',
          useValue: mockConnectionSuccess
        },
        {
          provide: BasicAPIProviderTokens.HEALTH_CHECK_SERVICE_TOKEN,
          useValue: mockHealthCheckService
        }
      ]
    }).compile();

    service = module.get<MongoDBInitService>(MongoDBInitService);
    const result = await service.checkItem();

    expect(result.state).toBe('UP');
    expect(result.name).toBeDefined();
    expect(result.type).toBeDefined();
  });

  it('should return state DOWN with inactive connection', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoDBInitService,
        {
          provide: 'DatabaseConnection',
          useValue: mockConnectionFailure
        },
        {
          provide: BasicAPIProviderTokens.HEALTH_CHECK_SERVICE_TOKEN,
          useValue: mockHealthCheckService
        }
      ]
    }).compile();

    service = module.get<MongoDBInitService>(MongoDBInitService);
    const result = await service.checkItem();

    expect(result.state).toBe('DOWN');
    expect(result.name).toBeDefined();
    expect(result.type).toBeDefined();
  });

  it('should call healthCheckService.addItem on module init', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoDBInitService,
        {
          provide: 'DatabaseConnection',
          useValue: mockConnectionSuccess
        },
        {
          provide: BasicAPIProviderTokens.HEALTH_CHECK_SERVICE_TOKEN,
          useValue: mockHealthCheckService
        }
      ]
    }).compile();

    service = module.get<MongoDBInitService>(MongoDBInitService);
    await service.onModuleInit();

    expect(mockHealthCheckService.addItem).toHaveBeenCalledWith(service);
  });
});
