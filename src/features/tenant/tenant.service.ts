import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Tenant } from './schemas';

import {
  TenantDTO,
  TenantCreateDTO,
  TenantUpdateDTO,
  TenantFindParametersDTO
} from './dto';

import { toDTO } from '../../core';

@Injectable()
export class TenantService {
  constructor(@InjectModel(Tenant.name) private tenantModel: Model<Tenant>) {}

  async create(data: TenantCreateDTO): Promise<TenantDTO> {
    const newTenant = new this.tenantModel(data);
    const result = await newTenant.save();
    return toDTO(TenantDTO, result);
  }

  async update(_id: string, data: TenantUpdateDTO): Promise<TenantDTO> {
    const result = await this.tenantModel.findByIdAndUpdate(_id, data, {
      new: true
    });
    return toDTO(TenantDTO, result);
  }

  async find(data: TenantFindParametersDTO): Promise<TenantDTO[] | undefined> {
    const params: any = {};

    if (data._id) {
      params._id = data._id;
    }

    if (data.status) {
      params.status = data.status;
    }

    if (data.partialName) {
      params.name = { $regex: `^${data.partialName}`, $options: 'i' };
    }

    const result = await this.tenantModel.find(params).exec();
    if (!result?.length) {
      return undefined;
    }

    return result.map((el) => toDTO(TenantDTO, el));
  }
}
