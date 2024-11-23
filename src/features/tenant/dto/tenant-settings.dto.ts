import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ModuleStatus } from '../enums';

export class TenantSettingsDTO {
  @Expose()
  @ApiProperty({
    description: 'Tenant setting unique ID',
    example: '67413a4d3c4d61641d81105b',
    required: false
  })
  _id?: string;

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

  @Expose()
  @ApiProperty({
    description: 'Tenant creation date/time',
    type: String,
    example: '2024-11-23T02:46:56.752Z'
  })
  createdAt?: Date;

  @Expose()
  @ApiProperty({
    description: 'Tenant last update date/time',
    type: String,
    example: '2024-11-23T02:46:56.752Z'
  })
  updatedAt?: Date;
}
