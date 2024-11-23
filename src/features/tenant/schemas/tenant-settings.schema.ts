import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ModuleStatus } from '../enums';

@Schema({ timestamps: true })
export class TenantSettings extends Document {
  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  @ApiProperty({
    description: 'Accounting module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  accountingModuleStatus: string;

  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  @ApiProperty({
    description: 'Financial module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  financialModuleStatus: string;

  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  @ApiProperty({
    description: 'Incoming module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  incomingModuleStatus: string;

  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  @ApiProperty({
    description: 'Purchasing module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  purchasingModuleStatus: string;

  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  @ApiProperty({
    description: 'Sales module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  salesModuleStatus: string;

  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  @ApiProperty({
    description: 'Stock module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  stockModuleStatus: string;

  @Prop({ required: true, default: ModuleStatus.INACTIVE })
  @ApiProperty({
    description: 'Tax module status',
    example: ModuleStatus.ACTIVE,
    required: true
  })
  taxModuleStatus: string;
}

export const TenantSettingSchema = SchemaFactory.createForClass(TenantSettings);
