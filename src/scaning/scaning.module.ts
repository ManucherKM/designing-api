import { Module } from '@nestjs/common';
import { ScaningService } from './scaning.service';
import { ScaningController } from './scaning.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Scaning, ScaningSchema } from './entities/scaning.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Scaning.name, schema: ScaningSchema }]),
  ],
  controllers: [ScaningController],
  providers: [ScaningService],
})
export class ScaningModule {}
