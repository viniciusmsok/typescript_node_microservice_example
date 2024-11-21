import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Tenant } from './schemas';
import { TenantDTO } from './dto';

@Injectable()
export class TenantService {
  constructor(@InjectModel(Tenant.name) private tenantModel: Model<Tenant>) {}

  async create(createTenantDto: TenantDTO): Promise<Tenant> {
    const newTenant = new this.tenantModel(createTenantDto);
    return newTenant.save();
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantModel.find().exec();
  }
}
