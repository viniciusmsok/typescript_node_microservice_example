import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { TenantSettingsDTO } from '../tenant-settings';

import { TenantStatus } from '../../enums';

export class TenantDTO {
  @Expose()
  @ApiProperty({
    description: 'Tenant unique UUID',
    example: '673e4bfc8cd77979a0f102d6',
    required: false
  })
  _id?: string;

  @Expose()
  @ApiProperty({
    description: 'Tenant name',
    example: 'Empresa de sucesso',
    required: true
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: `Tenant status (${Object.values(TenantStatus).join(', ')})`,
    example: TenantStatus.ACTIVE,
    required: true
  })
  status: TenantStatus;

  @Expose()
  @ApiProperty({
    description: 'Tenant configuration settings',
    type: TenantSettingsDTO,
    required: true
  })
  settings: TenantSettingsDTO;

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
