import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import env from 'env-var';
import { MongooseModule } from '@nestjs/mongoose';
import { ScaningModule } from './scaning/scaning.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(env.get('MONGODB_URL').required().asString()),
    ScaningModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
