import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";

export enum HistoryType {
  REVENUE,
  SPENDING
}

export enum SpendingType {
  CARD,
  ACCOUNT,
  CASH
}

export type HistoryDocument = History & Document;

@Schema({timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}})

@Schema()
export class History {
  @Prop({default: new Date(), type: mongooseSchema.Types.Date})
  date: Date;
  @Prop({required: true})
  amount: number;
  @Prop({type: String, enum: HistoryType})
  type: string;
  @Prop({required: true, enum: SpendingType})
  spendingType: string
  @Prop({required: true})
  description: string;
  @Prop()
  categoryId: string;
  @Prop({default: new Date(), type: mongooseSchema.Types.Date})
  createdAt: Date;
  @Prop({default: new Date(), type: mongooseSchema.Types.Date})
  updatedAt: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
