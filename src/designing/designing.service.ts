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
    const foundModel = await this.designingModel.findOne({}, { _id: false });

    return foundModel;
  }

  update(id: number, updateDesigningDto: UpdateDesigningDto) {
    return `This action updates a #${id} designing`;
  }
}
