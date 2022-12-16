import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as mongooseSchema } from "mongoose";
import { Document } from "mongoose";
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type CardDocument = Card & Document;

@Schema({timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}})

@Schema()
export class Card {
  @Prop({required: true})
  name: string;
  @Prop({required: true, unique: true})
  number: string;
  @Prop({required: true})
  description: string;
  @Prop({default: new Date(), type: mongooseSchema.Types.Date})
  createdAt: Date;
  @Prop({default: new Date(), type: mongooseSchema.Types.Date})
  updatedAt: Date;
}

const schema = SchemaFactory.createForClass(Card);
schema.plugin(mongoosePaginate);
export const CardSchema = schema;
