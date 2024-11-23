import { Expose, Type } from 'class-transformer';
import { IsString, IsOptional, ValidateNested } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { TenantSettingsUpdateDTO } from '../tenant-settings';

import { TenantStatus } from '../../enums';

import { IsEnum } from '../../../../core';

export class TenantUpdateDTO {
  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Tenant name',
    example: 'Empresa de sucesso'
  })
  name?: string;

  @Expose()
  @IsEnum(TenantStatus)
  @ApiPropertyOptional({
    description: `Tenant status (${Object.values(TenantStatus).join(', ')})`,
    example: TenantStatus.ACTIVE
  })
  status?: TenantStatus;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => TenantSettingsUpdateDTO)
  @ApiPropertyOptional({
    description: 'Tenant configuration settings',
    type: TenantSettingsUpdateDTO
  })
  settings?: TenantSettingsUpdateDTO;
}
