import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Tenant } from './schemas';
import { TenantDTO, TenantFindParametersDTO } from './dto';

@Injectable()
export class TenantService {
  constructor(@InjectModel(Tenant.name) private tenantModel: Model<Tenant>) {}

  async create(createTenantDto: TenantDTO): Promise<Tenant> {
    const newTenant = new this.tenantModel(createTenantDto);
    return newTenant.save();
  }

  async find(queryParams: TenantFindParametersDTO): Promise<Tenant[]> {
    const params: any = {};

    if (queryParams._id) {
      params._id = queryParams._id;
    }

    if (queryParams.status) {
      params.status = queryParams.status;
    }

    if (queryParams.partialName) {
      params.name = { $regex: `^${queryParams.partialName}`, $options: 'i' };
    }

    return this.tenantModel.find(params).exec();
  }
}
