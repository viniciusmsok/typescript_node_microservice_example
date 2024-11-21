import { TenantStatus } from '../enums';
import { TenantSettingsDTO } from './tenant-settings.dto';

export class TenantDTO {
  name: string;
  status: TenantStatus;
  settings: TenantSettingsDTO;
}
