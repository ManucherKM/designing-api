import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import env from 'env-var';
import { MongooseModule } from '@nestjs/mongoose';
import { ScaningModule } from './scaning/scaning.module';
import { ModelingModule } from './modeling/modeling.module';
import { DesigningModule } from './designing/designing.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(env.get('MONGODB_URL').required().asString()),
    ScaningModule,
    ModelingModule,
    DesigningModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
