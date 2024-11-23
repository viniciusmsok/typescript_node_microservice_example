import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ModuleStatus } from '../../enums';

export class TenantSettingsCreateDTO {
  @Expose()
  @ApiProperty({
    description: 'Accounting module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  accountingModuleStatus: ModuleStatus;

  @Expose()
  @ApiProperty({
    description: 'Financial module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  financialModuleStatus: ModuleStatus;

  @Expose()
  @ApiProperty({
    description: 'Incoming module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  incomingModuleStatus: ModuleStatus;

  @Expose()
  @ApiProperty({
    description: 'Purchasing module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  purchasingModuleStatus: ModuleStatus;

  @Expose()
  @ApiProperty({
    description: 'Sales module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  salesModuleStatus: ModuleStatus;

  @Expose()
  @ApiProperty({
    description: 'Stock module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  stockModuleStatus: ModuleStatus;

  @Expose()
  @ApiProperty({
    description: 'Tax module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  taxModuleStatus: ModuleStatus;
}
