import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { BadRequestException } from '@nestjs/common';

export function getDTO<T>(dtoClass: new () => T, dtoData: Partial<T>): T {
  const dtoInstance = plainToInstance(dtoClass, dtoData, {
    enableImplicitConversion: true
  });

  const errors = validateSync(Object(dtoInstance));

  if (errors.length > 0) {
    throw new BadRequestException(errors.join(' | '));
  }

  return dtoInstance;
}
