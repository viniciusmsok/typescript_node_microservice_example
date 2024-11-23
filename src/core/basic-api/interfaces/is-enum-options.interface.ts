import { ValidationOptions } from 'class-validator';

export interface IsEnumOptions extends ValidationOptions {
  required?: boolean;
  nullable?: boolean;
}
