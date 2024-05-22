import { Injectable } from '@nestjs/common';
import { CreateDesigningDto } from './dto/create-designing.dto';
import { UpdateDesigningDto } from './dto/update-designing.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Designing } from './entities/designing.entity';
import { Model } from 'mongoose';

@Injectable()
export class DesigningService {
  constructor(
    @InjectModel(Designing.name)
    private readonly designingModel: Model<Designing>,
  ) {
    designingModel.find().then((models) => {
      if (models.length !== 0) return;

      designingModel.create({});
    });
  }

  async getCurrent() {
    const foundModel = await this.designingModel.findOne({});

    return foundModel;
  }

  async findById(id: string) {
    return await this.designingModel.findOne({
      _id: id,
    });
  }

  async update(id: string, updateDesigningDto: UpdateDesigningDto) {
    const foundModel = await this.findById(id);

    if (!foundModel) {
      throw new Error('Model not found');
    }

    const formatedModel = foundModel.toObject();

    const newModel = { ...formatedModel, ...updateDesigningDto };

    const updateResults = await this.designingModel.updateOne(
      { _id: id },
      newModel,
    );

    return !!updateResults;
  }
}
