import * as dotenv from 'dotenv';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IEnvironmentService } from './environment-service.interface';

dotenv.config();

@Injectable()
export class EnvironmentService implements IEnvironmentService {
  constructor(protected configService: ConfigService) {}

  public setString(key: string, required = false, value?: string): string | undefined {
    if (!value) {
      value = process.env[key];
    }

    if (required && !value) {
      throw new Error(`Required string environment attribute: ${key}`);
    }

    if (value) {
      this.configService.set(key, value);
    }

    return value;
  }

  public setInt(key: string, required = false, value?: number): number | undefined {
    if (!value) {
      value = parseInt(process.env[key]);
    }

    const valueOk = (value || value === 0);

    if (required && !valueOk) {
      throw new Error(`Required int environment attribute: ${key}`);
    }

    if (valueOk) {
      this.configService.set(key, value);
    }

    return value;
  }

  public setNumber(key: string, required = false, value?: number): number | undefined {
    if (!value) {
      value = Number(process.env[key]);
    }

    const valueOk = (value || value === 0);

    if (required && !valueOk) {
      throw new Error(`Required number environment attribute: ${key}`);
    }

    if (valueOk) {
      this.configService.set(key, value);
    }

    return value;
  }
}
