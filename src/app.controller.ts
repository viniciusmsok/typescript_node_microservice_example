import { Response } from 'express';

import {
  Get,
  Res,
  Inject,
  HttpCode,
  Controller,
  HttpStatus
} from '@nestjs/common';

import {
  ApiResponse,
  ApiOperation,
  ApiDefaultResponse,
  ApiExcludeEndpoint
} from '@nestjs/swagger';

import {
  HealthCheckDTO,
  IHealthCheckService,
  BasicAPIProviderTokens
} from './core';

@Controller()
export class AppController {
  constructor(
    @Inject(BasicAPIProviderTokens.HEALTH_CHECK_SERVICE_TOKEN)
    private readonly service: IHealthCheckService
  ) {}

  @ApiExcludeEndpoint()
  @Get()
  root(@Res() res: Response): void {
    res.send(
      `
      <a href="/swagger">swagger</a>
      <br/>
      <a href="/health">health</a>
      `
    );
  }

  @Get('/health')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Application health check',
    tags: ['Health']
  })
  @ApiDefaultResponse({
    description: 'OK',
    type: HealthCheckDTO,
    isArray: true
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async healthCheck(): Promise<HealthCheckDTO> {
    return this.service.getHealth();
  }
}
