import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { TenantSettings } from './tenant-settings.schema';

@Schema({ timestamps: true })
export class Tenant extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: TenantSettings, required: false })
  settings: any;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
