import { ApiProperty } from '@nestjs/swagger';
import { HealthCheckStateType } from '../enums';
import { HealthCheckItemDTO } from './health-check-item.dto';

export class HealthCheckDTO {
  @ApiProperty({
    description: 'Application health item state type',
    example: HealthCheckStateType.UP
  })
  state: HealthCheckStateType;

  @ApiProperty({
    description: 'Application health check message',
    example: 'Application is up and running.'
  })
  message: string;

  @ApiProperty({
    description: 'Date/time (ISO timestamp)',
    example: new Date().toISOString()
  })
  timestamp: string;

  @ApiProperty({
    description: 'Health check items',
    type: [HealthCheckItemDTO]
  })
  items: HealthCheckItemDTO[];
}
