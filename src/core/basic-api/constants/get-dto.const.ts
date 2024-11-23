import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { BadRequestException } from '@nestjs/common';

export function getDTO<T>(dtoClass: new () => T, dtoData: Partial<T>): T {
  const dtoInstance = plainToInstance(dtoClass, dtoData, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true
  });

  const errors: ValidationError[] = validateSync(Object(dtoInstance));
  if (errors.length) {
    let ex: any = {};

    if (errors[0].children?.length) {
      ex = errors[0].children[0];
    } else {
      ex = errors[0];
    }

    if (ex.constraints) {
      throw new BadRequestException(
        ex.constraints.customValidation || ex.constraints.isString
      );
    }

    throw 'Undefined validation error';
  }

  return dtoInstance;
}
