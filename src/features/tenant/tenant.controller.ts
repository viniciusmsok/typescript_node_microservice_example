import { Get, Post, Body, Controller } from '@nestjs/common';

import { Tenant } from './schemas';
import { TenantDTO } from './dto';
import { TenantService } from './tenant.service';

import { getDTO } from '../../core';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('/')
  create(@Body() tenant: any): Promise<Tenant> {
    const tenantDTO = getDTO(TenantDTO, tenant);
    return this.tenantService.create(tenantDTO);
  }

  @Get('/')
  findAll(): Promise<Tenant[]> {
    return this.tenantService.findAll();
  }
}
