import { ModuleStatus } from '../enums';

export class TenantSettingsDTO {
  stockModuleStatus: ModuleStatus;
  financialModuleStatus: ModuleStatus;
  salesModuleStatus: ModuleStatus;
  incomingModuleStatus: ModuleStatus;
  purchasingModuleStatus: ModuleStatus;
  accountingModuleStatus: ModuleStatus;
  taxModuleStatus: ModuleStatus;
}
