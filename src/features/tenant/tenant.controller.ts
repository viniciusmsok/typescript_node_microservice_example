import { Response } from 'express';

import {
  ApiQuery,
  ApiResponse,
  ApiOperation,
  ApiDefaultResponse,
  ApiBody
} from '@nestjs/swagger';

import {
  Get,
  Res,
  Post,
  Body,
  Query,
  HttpCode,
  Controller,
  HttpStatus,
  BadRequestException
} from '@nestjs/common';

import { TenantService } from './tenant.service';
import { TenantDTO, TenantFindParametersDTO } from './dto';

import { getDTO } from '../../core';
import { TenantStatus } from './enums';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create new' })
  @HttpCode(HttpStatus.CREATED)
  @ApiDefaultResponse({
    description: 'OK',
    type: TenantDTO,
    isArray: true
  })
  @ApiBody({
    type: TenantDTO,
    description: 'New Tenant attributes'
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  create(@Body() tenant: any): Promise<TenantDTO> {
    const tenantDTO = getDTO(TenantDTO, tenant);
    return this.tenantService.create(tenantDTO);
  }

  @Get('/')
  @ApiOperation({ summary: 'Find by parameter' })
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: '_id',
    required: false,
    example: '67413caffd77b76ea2b41985',
    type: String,
    description: 'Tenant unique UUID'
  })
  @ApiQuery({
    name: 'partialName',
    required: false,
    example: 'Empresa de',
    type: String,
    description: 'Tenant partial name'
  })
  @ApiQuery({
    name: 'status',
    required: false,
    example: 'ACTIVE',
    type: String,
    description: `Tenant status (${Object.values(TenantStatus).join(', ')})`
  })
  @ApiDefaultResponse({
    description: 'OK',
    type: TenantDTO,
    isArray: true
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async find(
    @Res() res: Response,
    @Query() queryParams: any
  ): Promise<Response> {
    const tenantFindParametersDTO = getDTO(
      TenantFindParametersDTO,
      queryParams
    );

    const { _id, partialName, status } = tenantFindParametersDTO;
    if (!_id && !partialName && !status) {
      throw new BadRequestException('At least one filter is required.');
    }

    const result = await this.tenantService.find(tenantFindParametersDTO);
    if (!result) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }

    return res.status(HttpStatus.OK).send(result);
  }
}
