import { PartialType } from '@nestjs/mapped-types';
import { CreateModelingDto } from './create-modeling.dto';

export class UpdateModelingDto extends PartialType(CreateModelingDto) {}
