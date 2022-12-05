import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { HistoryDocument } from "./history.schema";
import { Model } from "mongoose";
import { HistoryDetails } from "./history-details.interface";

@Injectable()
export class HistoryService {
  constructor(@InjectModel('History') private readonly historyModel: Model<HistoryDocument>) {}

  _getHistoryDetails(history: HistoryDocument): HistoryDetails {
    return {
      id: history._id,
      date: history.date,
      amount: history.amount,
      type: history.type,
      spendingType: history.spendingType,
      description: history.description,
      categoryId: history.categoryId,
      createdAt: history.createdAt,
      updatedAt: history.updatedAt
    }
  }

  // TODO query_params
  // With Sort
  // type, spendingType, categoryId, date
  async findAll(): Promise<HistoryDocument[]> {
    return this.historyModel.find().exec();
  }

  async find(id: string): Promise<HistoryDocument> {
    return this.historyModel.findById(id).exec();
  }

  async findById(id: string): Promise<HistoryDetails | null> {
    const history = await this.historyModel.findById(id).exec();
    if (!history) return null;
    return this._getHistoryDetails(history);
  }

  async create(
    date: Date,
    amount: number,
    type: string,
    spendingType: string,
    description: string,
    categoryId: string
  ): Promise<HistoryDocument> {
    const newHistory = new this.historyModel({date, amount, type, spendingType, description, categoryId});
    return newHistory.save();
  }

  async update(
    id: string,
    amount: number,
    type: string,
    spendingType: string,
    description: string,
    categoryId: string
  ): Promise<HistoryDocument> {
    let existHistory = await this.find(id);
    existHistory.amount = amount ?? existHistory.amount;
    existHistory.type = type ?? existHistory.type;
    existHistory.spendingType = spendingType ?? existHistory.spendingType;
    existHistory.description = description ?? existHistory.description;
    existHistory.categoryId = categoryId ?? existHistory.categoryId;

    return existHistory.save();
  }

  async delete(id: string) {
    return this.historyModel.deleteOne({_id: id}).exec();
  }

  async deleteAllHistories(idList: string[]) {
    return this.historyModel.deleteMany({_id: {$in: idList}});
  }

}
