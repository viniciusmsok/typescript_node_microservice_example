import { Expose } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ModuleStatus } from '../../enums';

export class TenantSettingsUpdateDTO {
  @Expose()
  @ApiPropertyOptional({
    description: 'Accounting module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  accountingModuleStatus?: ModuleStatus;

  @Expose()
  @ApiPropertyOptional({
    description: 'Financial module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  financialModuleStatus?: ModuleStatus;

  @Expose()
  @ApiPropertyOptional({
    description: 'Incoming module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  incomingModuleStatus?: ModuleStatus;

  @Expose()
  @ApiPropertyOptional({
    description: 'Purchasing module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  purchasingModuleStatus?: ModuleStatus;

  @Expose()
  @ApiPropertyOptional({
    description: 'Sales module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  salesModuleStatus?: ModuleStatus;

  @Expose()
  @ApiPropertyOptional({
    description: 'Stock module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  stockModuleStatus?: ModuleStatus;

  @Expose()
  @ApiPropertyOptional({
    description: 'Tax module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  taxModuleStatus?: ModuleStatus;
}
