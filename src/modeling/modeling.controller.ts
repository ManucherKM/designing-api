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
  @UseInterceptors(SerializerInterceptor(Modeling))
  async update(
    @Param('id') id: string,
    @Body() updateModelingDto: UpdateModelingDto,
  ) {
    try {
      const isUpdated = await this.modelingService.update(
        id,
        updateModelingDto,
      );

      if (!isUpdated) {
        throw new HttpException(
          { message: 'Failed to update the model.' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const foundModel = await this.modelingService.findById(id);

      if (!foundModel) {
        throw new HttpException(
          { message: 'Failed to retrieve the model.' },
          HttpStatus.BAD_REQUEST,
        );
      }

      return foundModel;
    } catch (e) {
      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
