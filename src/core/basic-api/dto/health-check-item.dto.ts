import { ApiProperty } from '@nestjs/swagger';
import { HealthCheckItemType, HealthCheckStateType } from '../enums';

export class HealthCheckItemDTO {
  @ApiProperty({
    description: 'Health item type',
    example: HealthCheckItemType.DATABASE
  })
  type: HealthCheckItemType;

  @ApiProperty({
    description: 'Health item name',
    example: 'Main database'
  })
  name: string;

  @ApiProperty({
    description: 'Health item state type',
    example: HealthCheckStateType.UP
  })
  state: HealthCheckStateType;
}
