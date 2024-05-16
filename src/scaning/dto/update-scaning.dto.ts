import { PartialType } from '@nestjs/mapped-types';
import { CreateScaningDto } from './create-scaning.dto';

export class UpdateScaningDto extends PartialType(CreateScaningDto) {}
