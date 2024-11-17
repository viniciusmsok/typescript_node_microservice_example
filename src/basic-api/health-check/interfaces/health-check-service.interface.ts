import { HealthCheckDTO } from '../dto';
import { IHealthCheckItemService } from './health-check-item-service.interface';

export interface IHealthCheckService {
  addItem(check: IHealthCheckItemService): void,
  getHealth(): Promise<HealthCheckDTO>
}
