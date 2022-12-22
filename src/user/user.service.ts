import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "./user.schema";
import { PaginateModel } from "mongoose";
import { UserDetails } from "./user-details.interface";
import { paginationLabels } from "../utils/pagination.interface";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: PaginateModel<UserDocument>) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }

  async findAll(queryParams) {
    const {
      page, size, keyword
    } = queryParams;

    return this.userModel.paginate(
      {},
      {
        page: page,
        limit: size,
        sort: {
          createdAt: -1
        },
        customLabels: paginationLabels
      }
    )
  }

  async find(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
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

  async update(
    id: string,
    name: string,
    email: string,
    phone: string
  ): Promise<UserDocument> {
    let existUser = await this.find(id);
    existUser.name = name ?? existUser.name;
    existUser.email = email ?? existUser.email;
    existUser.phone = phone ?? existUser.phone;

    return existUser.save();
  }

}
