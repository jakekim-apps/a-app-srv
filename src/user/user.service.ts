import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { UserDetails } from "./user-details.interface";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({email}).exec();
  }

  async findByPhone(phone: string): Promise<UserDocument | null> {
    return this.userModel.findOne({phone}).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
    phone: string
  ): Promise<UserDocument> {
    const newUser = new this.userModel({name, email, password: hashedPassword, phone});
    return newUser.save();
  }
}
