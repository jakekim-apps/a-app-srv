import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AccountDocument } from "./account.schema";
import { Model } from "mongoose";
import { AccountDetails } from "./account-details.interface";

@Injectable()
export class AccountService {
  constructor(@InjectModel('Account') private readonly accountModel: Model<AccountDocument>) {}

  _getAccountDetails(account: AccountDocument): AccountDetails {
    return {
      id: account._id,
      name: account.name,
      number: account.number,
      balance: account.balance,
      description: account.description,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt
    }
  }

  async findAll(): Promise<AccountDocument[]> {
    return this.accountModel.find().exec();
  }

  async find(id: string): Promise<AccountDocument> {
    return this.accountModel.findById(id).exec();
  }

  async findById(id: string): Promise<AccountDetails | null> {
    const account = await this.accountModel.findById(id).exec();
    if (!account) return null;
    return this._getAccountDetails(account);
  }

  async create(
    name: string,
    number: string,
    balance: number,
    description: string
  ): Promise<AccountDocument> {
    const newAccount = new this.accountModel({name, number, balance, description});
    return newAccount.save();
  }

  async update(
    id: string,
    name: string,
    number: string,
    balance: number,
    description: string
  ): Promise<AccountDocument> {
    let existAccount = await this.find(id);
    existAccount.name = name ?? existAccount.name;
    existAccount.number = number ?? existAccount.number;
    existAccount.balance = balance ?? existAccount.balance;
    existAccount.description = description ?? existAccount.description;

    return existAccount.save();
  }

  async delete(id: string) {
    return this.accountModel.deleteOne({_id: id}).exec();
  }

  async deleteAll(idList: string[]) {
    return this.accountModel.deleteMany({_id:{$in: idList}});
  }

}
