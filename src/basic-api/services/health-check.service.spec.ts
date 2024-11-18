import { HealthCheckService } from './health-check.service';
import { HealthCheckStateType } from '../enums';
import { IHealthCheckItemService } from '../interfaces';
import { HealthCheckDTO } from '../dto';

describe('HealthCheckService', () => {
  let healthCheckService: HealthCheckService;

  beforeEach(() => {
    healthCheckService = new HealthCheckService();
  });

  describe('addItem', () => {
    it('should add a health check item', () => {
      const mockCheckItem: IHealthCheckItemService = {
        checkItem: jest.fn().mockResolvedValue({
          name: 'Database',
          state: HealthCheckStateType.UP,
          details: {}
        })
      };

      healthCheckService.addItem(mockCheckItem);

      expect(healthCheckService.items).toContain(mockCheckItem);
    });
  });

  describe('getHealth', () => {
    it('should return UP when all items are healthy', async () => {
      const mockCheckItem: IHealthCheckItemService = {
        checkItem: jest.fn().mockResolvedValue({
          name: 'Database',
          state: HealthCheckStateType.UP,
          details: {}
        })
      };

      healthCheckService.addItem(mockCheckItem);

      const result: HealthCheckDTO = await healthCheckService.getHealth();

      expect(result.state).toBe(HealthCheckStateType.UP);
      expect(result.message).toBe('Application is up and running.');
      expect(result.items).toEqual([
        { name: 'Database', state: HealthCheckStateType.UP, details: {} }
      ]);
    });

    it('should return DOWN when some items are unhealthy', async () => {
      const mockHealthyItem: IHealthCheckItemService = {
        checkItem: jest.fn().mockResolvedValue({
          name: 'Database',
          state: HealthCheckStateType.UP,
          details: {}
        })
      };

      const mockUnhealthyItem: IHealthCheckItemService = {
        checkItem: jest.fn().mockResolvedValue({
          name: 'MongoDB',
          state: HealthCheckStateType.DOWN,
          details: { error: 'Connection refused' }
        })
      };

      healthCheckService.addItem(mockHealthyItem);
      healthCheckService.addItem(mockUnhealthyItem);

      const result: HealthCheckDTO = await healthCheckService.getHealth();

      expect(result.state).toBe(HealthCheckStateType.DOWN);
      expect(result.message).toContain('The application is unstable');
      expect(result.message).toContain('MongoDB');
      expect(result.items).toEqual([
        { name: 'Database', state: HealthCheckStateType.UP, details: {} },
        {
          name: 'MongoDB',
          state: HealthCheckStateType.DOWN,
          details: { error: 'Connection refused' }
        }
      ]);
    });

    it('should handle no items gracefully', async () => {
      const result: HealthCheckDTO = await healthCheckService.getHealth();

      expect(result.state).toBe(HealthCheckStateType.UP);
      expect(result.message).toBe('Application is up and running.');
      expect(result.items).toEqual([]);
    });
  });
});
