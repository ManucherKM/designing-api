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
    const foundModel = await this.modelingModel.findOne({});

    return foundModel;
  }

  async findById(id: string) {
    return await this.modelingModel.findOne({
      _id: id,
    });
  }

  async update(id: string, updateModelingDto: UpdateModelingDto) {
    const foundModel = await this.findById(id);

    if (!foundModel) {
      throw new Error('Model not found');
    }

    const formatedModel = foundModel.toObject();

    const newModel = { ...formatedModel, ...updateModelingDto };

    const updateResults = await this.modelingModel.updateOne(
      { _id: id },
      newModel,
    );

    return !!updateResults;
  }
}
