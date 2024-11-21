import { HealthCheckItemDTO } from '../dto';

export interface IHealthCheckItemService {
  checkItem(): Promise<HealthCheckItemDTO>;
}
