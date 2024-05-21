import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ModelingService } from './modeling.service';
import { UpdateModelingDto } from './dto/update-modeling.dto';
import SerializerInterceptor from '@/interceptors/Serializer.interceptor';
import { Modeling } from './entities/modeling.entity';

@Controller('modeling')
export class ModelingController {
  constructor(private readonly modelingService: ModelingService) {}

  @Get()
  @UseInterceptors(SerializerInterceptor(Modeling))
  async getCurrent() {
    try {
      return await this.modelingService.getCurrent();
    } catch (e) {
      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModelingDto: UpdateModelingDto,
  ) {
    try {
      return await this.modelingService.update(id, updateModelingDto);
    } catch (e) {
      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
