import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Tenant } from './schemas';
import { TenantDTO, TenantFindParametersDTO } from './dto';

import { toDTO } from '../../core';

@Injectable()
export class TenantService {
  constructor(@InjectModel(Tenant.name) private tenantModel: Model<Tenant>) {}

  async create(createTenantDTO: TenantDTO): Promise<TenantDTO> {
    const newTenant = new this.tenantModel(createTenantDTO);
    const result = await newTenant.save();
    return toDTO(TenantDTO, result);
  }

  async find(
    queryParams: TenantFindParametersDTO
  ): Promise<TenantDTO[] | undefined> {
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

    const result = await this.tenantModel.find(params).exec();
    if (!result?.length) {
      return undefined;
    }

    const data = result.map((el) => toDTO(TenantDTO, el));

    return data;
  }
}
