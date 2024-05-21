import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class GeometryComplexity {
  @IsNumber()
  @IsOptional()
  easy: number;

  @IsNumber()
  @IsOptional()
  normal: number;

  @IsNumber()
  @IsOptional()
  hard: number;
}

class Technology {
  @IsNumber()
  @IsOptional()
  fdm: number;

  @IsNumber()
  @IsOptional()
  photopolymer: number;
}

class Assignment {
  @IsNumber()
  @IsOptional()
  layout: number;

  @IsNumber()
  @IsOptional()
  artistic: number;

  @IsNumber()
  @IsOptional()
  technical: number;
}

export class CreateDesigningDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => GeometryComplexity)
  geometry_complexity: GeometryComplexity;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Technology)
  technology: Technology;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Assignment)
  assignment: Assignment;

  @IsNumber()
  @IsOptional()
  postprocessing: number;
}
