import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { TenantSettingsCreateDTO } from './tenant-settings-create.dto';

export class TenantSettingsDTO extends TenantSettingsCreateDTO {
  @Expose()
  @ApiProperty({
    description: 'Tenant setting unique ID',
    example: '67413a4d3c4d61641d81105b',
    required: false
  })
  _id?: string;

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
