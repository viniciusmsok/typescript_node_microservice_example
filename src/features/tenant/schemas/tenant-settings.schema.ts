import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ModuleStatus } from '../enums';

@Schema()
export class TenantSettings extends Document {
  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  stockModuleStatus: string;

  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  financialModuleStatus: string;

  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  salesModuleStatus: string;

  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  incomingModuleStatus: string;

  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  purchasingModuleStatus: string;

  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  accountingModuleStatus: string;

  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  taxModuleStatus: string;
}

export const TenantSettingSchema = SchemaFactory.createForClass(TenantSettings);
