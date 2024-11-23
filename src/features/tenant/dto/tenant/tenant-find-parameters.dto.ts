import { Expose } from 'class-transformer';
import { TenantStatus } from '../../enums';

export class TenantFindParametersDTO {
  @Expose()
  public _id?: string;

  @Expose()
  public partialName?: string;

  @Expose()
  public status?: TenantStatus;
}
