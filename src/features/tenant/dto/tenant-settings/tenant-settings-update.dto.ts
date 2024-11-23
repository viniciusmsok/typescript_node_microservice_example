import { Expose } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { ModuleStatus } from '../../enums';
import { IsEnum } from '../../../../core';

export class TenantSettingsUpdateDTO {
  @Expose()
  @IsEnum(ModuleStatus)
  @ApiPropertyOptional({
    description: 'Accounting module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  accountingModuleStatus?: ModuleStatus;

  @Expose()
  @IsEnum(ModuleStatus)
  @ApiPropertyOptional({
    description: 'Financial module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  financialModuleStatus?: ModuleStatus;

  @Expose()
  @IsEnum(ModuleStatus)
  @ApiPropertyOptional({
    description: 'Incoming module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  incomingModuleStatus?: ModuleStatus;

  @Expose()
  @IsEnum(ModuleStatus)
  @ApiPropertyOptional({
    description: 'Purchasing module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  purchasingModuleStatus?: ModuleStatus;

  @Expose()
  @IsEnum(ModuleStatus)
  @ApiPropertyOptional({
    description: 'Sales module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  salesModuleStatus?: ModuleStatus;

  @Expose()
  @IsEnum(ModuleStatus)
  @ApiPropertyOptional({
    description: 'Stock module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  stockModuleStatus?: ModuleStatus;

  @Expose()
  @IsEnum(ModuleStatus)
  @ApiPropertyOptional({
    description: 'Tax module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  taxModuleStatus?: ModuleStatus;
}
