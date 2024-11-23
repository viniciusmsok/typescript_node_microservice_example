import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { TenantSettingsCreateDTO } from '../tenant-settings';

import { TenantStatus } from '../../enums';

export class TenantCreateDTO {
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
    type: TenantSettingsCreateDTO,
    required: true
  })
  settings: TenantSettingsCreateDTO;
}
