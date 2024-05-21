import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ScaningService } from './scaning.service';
import { UpdateScaningDto } from './dto/update-scaning.dto';
import { Scaning } from './entities/scaning.entity';
import SerializerInterceptor from '@/interceptors/Serializer.interceptor';

@Controller('scaning')
export class ScaningController {
  constructor(private readonly scaningService: ScaningService) {}

  @Get()
  @UseInterceptors(SerializerInterceptor(Scaning))
  async getCurrent() {
    try {
      return await this.scaningService.getCurrent();
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
    @Body() updateScaningDto: UpdateScaningDto,
  ) {
    try {
      return await this.scaningService.update(id, updateScaningDto);
    } catch (e) {
      throw new HttpException(
        { message: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
