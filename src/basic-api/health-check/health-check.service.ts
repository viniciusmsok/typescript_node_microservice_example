import { Injectable } from '@nestjs/common';

import { HealthCheckDTO } from './dto';
import { HealthCheckStateType } from './enums';

import {
  IHealthCheckService,
  IHealthCheckItemService
} from './interfaces';

@Injectable()
export class HealthCheckService implements IHealthCheckService {
  private items: IHealthCheckItemService[] = [];

  async getHealth(): Promise<HealthCheckDTO> {
    let state = HealthCheckStateType.UP;
    let message = 'Application is up and running.';

    const errorItems: string[] = [];

    const items = await Promise.all(this.items.map(check => check.checkItem()));
    for (const item of items) {
      if (item.state !== HealthCheckStateType.UP) {
        errorItems.push(item.name);
      }
    }

    if (errorItems.length) {
      state = HealthCheckStateType.DOWN;
      message = `The application is unstable. Please check the following items: ${errorItems.join(', ')}`;
    }

    const result : HealthCheckDTO = {
      state,
      message,
      timestamp: new Date().toISOString(),
      items
    };

    return result;
  }

  addItem(check: IHealthCheckItemService): void {
    this.items.push(check);
  }
}
