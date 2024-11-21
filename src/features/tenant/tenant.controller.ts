import { Get, Post, Body, Query, Controller } from '@nestjs/common';

import { Tenant } from './schemas';
import { TenantService } from './tenant.service';
import { TenantDTO, TenantFindParametersDTO } from './dto';

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
  find(@Query() queryParams: any): Promise<Tenant[]> {
    const tenantFindParametersDTO = getDTO(
      TenantFindParametersDTO,
      queryParams
    );

    return this.tenantService.find(tenantFindParametersDTO);
  }
}
