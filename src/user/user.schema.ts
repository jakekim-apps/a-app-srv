import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as mongooseSchema } from "mongoose";
import { Document } from "mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";

export type UserDocument = User & Document;

@Schema({timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}})

@Schema()
export class User {
  @Prop({required: true})
  name: string;
  @Prop({required: true, unique: true})
  email: string;
  @Prop({required: true})
  password: string;
  @Prop({required: true, unique: true})
  phone: string;
  @Prop({default: new Date(), type: mongooseSchema.Types.Date})
  createdAt: Date;
  @Prop({default: new Date(), type: mongooseSchema.Types.Date})
  updatedAt: Date;
}

const schema = SchemaFactory.createForClass(User);
schema.plugin(mongoosePaginate);
export const UserSchema = schema;
