import {
  Controller,
  Body,
  Patch,
  Param,
  Get,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DesigningService } from './designing.service';
import { UpdateDesigningDto } from './dto/update-designing.dto';
import SerializerInterceptor from '@/interceptors/Serializer.interceptor';
import { Designing } from './entities/designing.entity';

@Controller('designing')
export class DesigningController {
  constructor(private readonly designingService: DesigningService) {}

  @Get()
  @UseInterceptors(SerializerInterceptor(Designing))
  async getCurrent() {
    try {
      return await this.designingService.getCurrent();
    } catch (e) {
      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @UseInterceptors(SerializerInterceptor(Designing))
  async update(
    @Param('id') id: string,
    @Body() updateDesigningDto: UpdateDesigningDto,
  ) {
    try {
      const isUpdated = await this.designingService.update(
        id,
        updateDesigningDto,
      );

      if (!isUpdated) {
        throw new HttpException(
          { message: 'Failed to update the model.' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const foundModel = await this.designingService.findById(id);

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
