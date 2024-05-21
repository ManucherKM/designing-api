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

class ModelType {
  @IsNumber()
  @IsOptional()
  artistic: number;

  @IsNumber()
  @IsOptional()
  engineer: number;
}

export class CreateModelingDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => GeometryComplexity)
  geometry_complexity?: GeometryComplexity;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => ModelType)
  model_type?: ModelType;

  @IsNumber()
  @IsOptional()
  design_documentation?: number;

  @IsNumber()
  @IsOptional()
  visualization?: number;

  @IsNumber()
  @IsOptional()
  animation?: number;
}
