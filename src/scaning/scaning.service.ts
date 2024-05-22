import { Injectable } from '@nestjs/common';
import { UpdateScaningDto } from './dto/update-scaning.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Scaning } from './entities/scaning.entity';
import { Model } from 'mongoose';

@Injectable()
export class ScaningService {
  constructor(
    @InjectModel(Scaning.name)
    private readonly scaningModel: Model<Scaning>,
  ) {
    scaningModel.find().then((models) => {
      if (models.length !== 0) return;

      scaningModel.create({});
    });
  }

  async getCurrent() {
    const foundModel = await this.scaningModel.findOne({});

    return foundModel;
  }

  async findById(id: string) {
    return await this.scaningModel.findOne({
      _id: id,
    });
  }

  async update(id: string, updateScaningDto: UpdateScaningDto) {
    const foundModel = await this.findById(id);

    if (!foundModel) {
      throw new Error('Model not found');
    }

    const formatedModel = foundModel.toObject();

    const newModel = { ...formatedModel, ...updateScaningDto };

    const updateResults = await this.scaningModel.updateOne(
      { _id: id },
      newModel,
    );

    return !!updateResults;
  }
}
