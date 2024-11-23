import { Document } from 'mongoose';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { BadRequestException } from '@nestjs/common';

export function toDTO<T>(
  dtoClass: new () => T,
  dtoData: Document,
  validate = false
): T {
  const data = dtoData.toObject() as Partial<T>;

  const dtoInstance = plainToInstance(dtoClass, data, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true
  });

  if (validate) {
    const errors = validateSync(Object(dtoInstance));

    if (errors.length > 0) {
      throw new BadRequestException(errors.join(' | '));
    }
  }

  return dtoInstance;
}
