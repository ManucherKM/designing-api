import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type ModelingDocument = HydratedDocument<Modeling>;

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

export class ModelType {
  constructor(artistic: number = 2, engineer: number = 2.2) {
    this.artistic = artistic;
    this.engineer = engineer;
  }

  @Prop({ type: Number, default: 2 })
  artistic: number;

  @Prop({ type: Number, default: 2.2 })
  engineer: number;
}

@Schema({
  timestamps: true,
})
export class Modeling {
  @Transform(({ obj }) => obj._id.toString())
  _id: Types.ObjectId;

  @Prop({
    type: GeometryComplexity,
    _id: false,
    default: new GeometryComplexity(),
  })
  geometry_complexity?: GeometryComplexity;

  @Prop({
    type: ModelType,
    _id: false,
    default: new ModelType(),
  })
  model_type?: ModelType;

  @Prop({ type: Number, default: 1.5 })
  design_documentation: number;

  @Prop({ type: Number, default: 1.6 })
  visualization: number;

  @Prop({ type: Number, default: 1.7 })
  animation: number;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  createdAt: Date;

  @Exclude()
  __v: number;
}

export const ModelingSchema = SchemaFactory.createForClass(Modeling);
