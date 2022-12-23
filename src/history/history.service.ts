import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { HistoryDocument, TargetType } from "./history.schema";
import { Model, PaginateModel } from "mongoose";
import { HistoryDetails } from "./history-details.interface";
import { paginationLabels } from "../utils/pagination.interface";
import { AccountService } from "../account/account.service";

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel('History') private readonly historyModel: PaginateModel<HistoryDocument>,
    private accountService: AccountService
  ) {}

  _getHistoryDetails(history: HistoryDocument): HistoryDetails {
    return {
      id: history._id,
      date: history.date,
      amount: history.amount,
      type: history.type,
      targetType: history.targetType,
      targetId: history.targetId,
      description: history.description,
      categoryId: history.categoryId,
      createdAt: history.createdAt,
      updatedAt: history.updatedAt
    }
  }

  // TODO query_params
  // With Sort
  // type, spendingType, categoryId, date
  async findAll(queryParams) {
    const {
      page,
      size,
      type,
      targetType,
      targetId,
      categoryId,
      startDate,
      endDate,
      keyword
    } = queryParams;

    let query: any = {};
    if (type) query.type = type;
    if (targetType) query.targetType = targetType;
    if (targetId) query.targetId = targetId;
    if (categoryId) query.categoryId = categoryId;
    if (startDate && endDate) {
      query.createdAt = {
        $gte: startDate,
        $lte: endDate
      }
    }
    return this.historyModel.paginate(
      {
        ...query
      },
      {
        page: page,
        limit: size,
        sort:
          {
            createdAt: -1
          },
        customLabels: paginationLabels
      }
    )
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
    targetType: string,
    targetId: string,
    description: string,
    categoryId: string
  ): Promise<HistoryDocument> {
    if (targetType === "1") {
      await this.accountService.updateBalance(targetId, type, amount);
    }
    const newHistory = new this.historyModel({date, amount, type, targetType, targetId, description, categoryId});
    return newHistory.save();
  }

  async update(
    id: string,
    amount: number,
    type: string,
    targetType: string,
    targetId: string,
    description: string,
    categoryId: string
  ): Promise<HistoryDocument> {
    let existHistory = await this.find(id);
    existHistory.amount = amount ?? existHistory.amount;
    existHistory.type = type ?? existHistory.type;
    existHistory.targetType = targetType ?? existHistory.targetType;
    existHistory.targetId = targetId ?? existHistory.targetId;
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

  async getTotalSummary() {
    return this.historyModel.aggregate([
      {
        $group: {_id: "$type", total: {$sum: "$amount"}}
      }
    ])
  }

  async getCategorySummary() {
    return this.historyModel.aggregate([
      {
        $group: {_id: "$categoryId", total: {$sum: "$amount"}}
      }
    ])
  }

  async getTypeSummary() {
    return this.historyModel.aggregate([
      {
        $group: {_id: "$targetId", total: {$sum: "$amount"}}
      }
    ])
  }

}
