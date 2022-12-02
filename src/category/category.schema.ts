import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";


export enum CategoryType {
  ALL,
  REVENUE,
  SPENDING
}

export type CategoryDocument = Category & Document;

@Schema({timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}})

@Schema()
export class Category {
  @Prop({required: true})
  name: string;
  @Prop({required: true})
  description: string;
  @Prop({type: String, enum: CategoryType})
  type: string | CategoryType;
  @Prop({default: new Date(), type: mongooseSchema.Types.Date})
  createdAt: Date;
  @Prop({default: new Date(), type: mongooseSchema.Types.Date})
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
