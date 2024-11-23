import { Expose } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { TenantSettingsUpdateDTO } from '../tenant-settings';

import { TenantStatus } from '../../enums';

export class TenantUpdateDTO {
  @Expose()
  @ApiPropertyOptional({
    description: 'Tenant name',
    example: 'Empresa de sucesso'
  })
  name?: string;

  @Expose()
  @ApiPropertyOptional({
    description: `Tenant status (${Object.values(TenantStatus).join(', ')})`,
    example: TenantStatus.ACTIVE
  })
  status?: TenantStatus;

  @Expose()
  @ApiPropertyOptional({
    description: 'Tenant configuration settings',
    type: TenantSettingsUpdateDTO
  })
  settings?: TenantSettingsUpdateDTO;
}
