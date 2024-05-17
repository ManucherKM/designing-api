import { Injectable } from '@nestjs/common';
import { CreateModelingDto } from './dto/create-modeling.dto';
import { UpdateModelingDto } from './dto/update-modeling.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Modeling } from './entities/modeling.entity';
import { Model } from 'mongoose';

@Injectable()
export class ModelingService {
  constructor(
    @InjectModel(Modeling.name)
    private readonly modelingModel: Model<Modeling>,
  ) {
    modelingModel.find().then((models) => {
      if (models.length !== 0) return;

      modelingModel.create({});
    });
  }

  async getCurrent() {
    const foundModel = await this.modelingModel.findOne({}, { _id: false });

    return foundModel;
  }

  update(id: number, updateModelingDto: UpdateModelingDto) {
    return `This action updates a #${id} modeling`;
  }
}
