import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';

export type DesigningDocument = HydratedDocument<Designing>;

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

export class Technology {
  constructor(fdm: number = 1.2, photopolymer: number = 1.3) {
    this.fdm = fdm;
    this.photopolymer = photopolymer;
  }

  @Prop({ type: Number, default: 1.2 })
  fdm: number;

  @Prop({ type: Number, default: 1.3 })
  photopolymer: number;
}

export class Assignment {
  constructor(
    layout: number = 1.2,
    artistic: number = 1.3,
    technical: number = 1.4,
  ) {
    this.layout = layout;
    this.artistic = artistic;
    this.technical = technical;
  }

  @Prop({ type: Number, default: 1.2 })
  layout: number;

  @Prop({ type: Number, default: 1.3 })
  artistic: number;

  @Prop({ type: Number, default: 1.4 })
  technical: number;
}

@Schema({
  timestamps: true,
})
export class Designing {
  @Transform(({ obj }) => obj._id.toString())
  _id: Types.ObjectId;

  @Prop({
    type: GeometryComplexity,
    _id: false,
    default: new GeometryComplexity(),
  })
  geometry_complexity?: GeometryComplexity;

  @Prop({
    type: Technology,
    _id: false,
    default: new Technology(),
  })
  photopolymer?: Technology;

  @Prop({
    type: Assignment,
    _id: false,
    default: new Assignment(),
  })
  assignment?: Assignment;

  @Prop({ type: Number, default: 1.8 })
  postprocessing: number;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  createdAt: Date;

  @Exclude()
  __v: number;
}

export const DesigningSchema = SchemaFactory.createForClass(Designing);
