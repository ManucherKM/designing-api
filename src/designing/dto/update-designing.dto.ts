import { PartialType } from '@nestjs/mapped-types';
import { CreateDesigningDto } from './create-designing.dto';

export class UpdateDesigningDto extends PartialType(CreateDesigningDto) {}
