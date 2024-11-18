import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { EnvironmentDTO } from './environment.dto';

export const createEnvironment = (
  config: Record<string, unknown>
): EnvironmentDTO => {
  const environment = plainToInstance(EnvironmentDTO, config, {
    enableImplicitConversion: true
  });

  const errors = validateSync(environment);

  if (errors.length > 0) {
    throw new Error(
      `Environment validation failed: ${errors.map((err) => JSON.stringify(err.constraints)).join(', ')}`
    );
  }

  return environment;
};
