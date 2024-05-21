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

class Surface {
  @IsNumber()
  @IsOptional()
  matte: number;

  @IsNumber()
  @IsOptional()
  brilliant: number;
}

class ScanningAccuracy {
  @IsNumber()
  @IsOptional()
  '0.1': number;

  @IsNumber()
  @IsOptional()
  '0.063': number;
}

export class CreateScaningDto {
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
  @Type(() => Surface)
  surface: Surface;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => ScanningAccuracy)
  scanning_accuracy: ScanningAccuracy;
}
