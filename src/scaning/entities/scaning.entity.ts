import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type ScaningDocument = HydratedDocument<Scaning>;

export class GeometryComplexity {
  constructor(easy: number = 1.2, normal: number = 1.3, hard: number = 1.5) {
    this.easy = easy;
    this.normal = normal;
    this.hard = hard;
  }

  @Prop({ type: Number, default: 1.2 })
  easy: number;

  @Prop({ type: Number, default: 1.3 })
  normal: number;

  @Prop({ type: Number, default: 1.5 })
  hard: number;
}

export class Surface {
  constructor(matte: number = 1.2, brilliant: number = 1.3) {
    this.matte = matte;
    this.brilliant = brilliant;
  }

  @Prop({ type: Number, default: 1.2 })
  matte: number;

  @Prop({ type: Number, default: 1.3 })
  brilliant: number;
}

export class ScanningAccuracy {
  constructor(target: { '0.1': number; '0.063': number } | {} = {}) {
    this['0.1'] = target['0.1'] || 1.2;
    this['0.063'] = target['0.063'] || 1.3;
  }

  @Prop({ type: Number, default: 1.2 })
  '0.1': number;

  @Prop({ type: Number, default: 1.3 })
  '0.063': number;
}

@Schema({
  timestamps: true,
})
export class Scaning {
  @Transform(({ obj }) => obj._id.toString())
  _id: Types.ObjectId;

  @Prop({
    type: GeometryComplexity,
    _id: false,
    default: new GeometryComplexity(),
  })
  geometry_complexity?: GeometryComplexity;

  @Prop({ type: Surface, _id: false, default: new Surface() })
  surface?: Surface;

  @Prop({ type: ScanningAccuracy, _id: false, default: new ScanningAccuracy() })
  scanning_accuracy?: ScanningAccuracy;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  createdAt: Date;

  @Exclude()
  __v: number;
}

export const ScaningSchema = SchemaFactory.createForClass(Scaning);
