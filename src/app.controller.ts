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
  ApiDefaultResponse,
  ApiExcludeEndpoint
} from '@nestjs/swagger';

import {
  HealthCheckDTO,
  IHealthCheckService,
  HealthCheckProviderTokens
} from './basic-api';

@Controller()
export class AppController {

  constructor(
    @Inject(HealthCheckProviderTokens.HEALTH_CHECK_SERVICE_TOKEN)
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

  @ApiDefaultResponse({ description: 'OK', type: HealthCheckDTO, isArray: true })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @Get('/health')
  @HttpCode(200)
  async healthCheck(): Promise<HealthCheckDTO> {
    return this.service.getHealth();
  }
}
