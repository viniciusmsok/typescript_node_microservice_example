import { TenantStatus } from '../enums';

export class TenantFindParametersDTO {
  _id?: string;
  partialName?: string;
  status?: TenantStatus;
}
