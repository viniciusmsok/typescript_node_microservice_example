import { Transform } from 'class-transformer';

import { registerDecorator, ValidationArguments } from 'class-validator';

import { IsEnumOptions } from '../interfaces';

export function IsEnum<T>(type: T, options?: IsEnumOptions): PropertyDecorator {
  return function (object: unknown, propertyName: string): void {
    Transform(({ value }) => {
      if (!options?.nullable && value === null) {
        value = undefined;
      }

      return value;
    })(object, propertyName);

    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options,
      validator: {
        validate: (value: any): boolean => {
          if (!options?.nullable && value === null) {
            return false;
          }

          if (!options?.required && !value) {
            return true;
          }

          if (!value) {
            return false;
          }

          return !!Object.values(type).includes(value);
        },

        defaultMessage: (va?: ValidationArguments): string => {
          return `Invalid '${va?.property}'. Options: ${Object.values(type).join(' | ')}`;
        }
      }
    });
  };
}
