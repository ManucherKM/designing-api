import { Module } from '@nestjs/common';
import { ModelingService } from './modeling.service';
import { ModelingController } from './modeling.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Modeling, ModelingSchema } from './entities/modeling.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Modeling.name, schema: ModelingSchema },
    ]),
  ],
  controllers: [ModelingController],
  providers: [ModelingService],
})
export class ModelingModule {}
