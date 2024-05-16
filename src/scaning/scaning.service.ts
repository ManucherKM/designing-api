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
    const foundModel = await this.scaningModel.findOne();

    return foundModel;
  }

  update(id: number, updateScaningDto: UpdateScaningDto) {
    return `This action updates a #${id} scaning`;
  }
}
