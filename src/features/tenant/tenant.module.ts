import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';

import { Tenant, TenantSchema } from './schemas';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Tenant.name, schema: TenantSchema }])
  ],

  controllers: [TenantController],

  providers: [ConfigService, TenantService],

  exports: []
})
export class TenantModule {}
