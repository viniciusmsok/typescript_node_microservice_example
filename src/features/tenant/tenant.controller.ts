import { Response } from 'express';

import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiOperation,
  ApiDefaultResponse
} from '@nestjs/swagger';

import {
  Get,
  Res,
  Post,
  Body,
  Patch,
  Query,
  Param,
  HttpCode,
  Controller,
  HttpStatus,
  BadRequestException
} from '@nestjs/common';

import { TenantService } from './tenant.service';

import { getDTO } from '../../core';
import { TenantStatus } from './enums';

import {
  TenantDTO,
  TenantCreateDTO,
  TenantUpdateDTO,
  TenantFindParametersDTO
} from './dto';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create new' })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: TenantCreateDTO,
    description: 'New tenant attributes'
  })
  @ApiDefaultResponse({
    description: 'OK',
    type: TenantDTO
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  create(@Body() data: any): Promise<TenantDTO> {
    const tenantDTO = getDTO(TenantCreateDTO, data);
    return this.tenantService.create(tenantDTO);
  }

  @Patch(':_id')
  @ApiOperation({ summary: 'Update' })
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: '_id',
    description: 'Tenant UUID',
    type: String,
    example: '673e4bfc8cd77979a0f102d6'
  })
  @ApiBody({
    type: TenantUpdateDTO,
    description: 'Update tenant attributes'
  })
  @ApiDefaultResponse({
    description: 'OK',
    type: TenantDTO
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  update(@Param('_id') _id: string, @Body() data: any): Promise<TenantDTO> {
    const tenantDTO = getDTO(TenantUpdateDTO, data);
    return this.tenantService.update(_id, tenantDTO);
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
  async find(@Res() res: Response, @Query() data: any): Promise<Response> {
    const tenantFindParametersDTO = getDTO(TenantFindParametersDTO, data);

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
