import { Module } from '@nestjs/common';
import { DesigningService } from './designing.service';
import { DesigningController } from './designing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Designing, DesigningSchema } from './entities/designing.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Designing.name, schema: DesigningSchema },
    ]),
  ],
  controllers: [DesigningController],
  providers: [DesigningService],
})
export class DesigningModule {}
