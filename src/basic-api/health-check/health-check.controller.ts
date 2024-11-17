import {
  Get,
  Inject,
  HttpCode,
  Controller
} from '@nestjs/common';

import { HealthCheckDTO } from './dto';
import { IHealthCheckService } from './interfaces';
import { HealthCheckProviderTokens } from './enums';

@Controller('health')
export class HealthCheckController {
  constructor(
    @Inject(HealthCheckProviderTokens.HEALTH_CHECK_SERVICE_TOKEN)
    private readonly service: IHealthCheckService
  ) {}

  @Get()
  @HttpCode(200)
  async healthCheck(): Promise<HealthCheckDTO> {
    return this.service.getHealth();
  }
}
