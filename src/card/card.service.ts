import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { CardDocument } from "./card.schema";
import { CardDetails } from "./card-details.interface";
import { PaginateModel } from 'mongoose';
import { paginationLabels } from "../utils/pagination.interface";

@Injectable()
export class CardService {
  constructor(@InjectModel('Card') private readonly cardModel: PaginateModel<CardDocument>) {}

  _getCardDetails(card: CardDocument): CardDetails {
    return {
      id: card._id,
      name: card.name,
      number: card.number,
      description: card.description,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt
    }
  }

  async findAll(queryParams) {
    const { page, size, keyword } = queryParams;
    return this.cardModel.paginate(
      {},
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

  async find(id: string): Promise<CardDocument> {
    return this.cardModel.findById(id).exec();
  }

  async findById(id: string): Promise<CardDetails | null> {
    const card = await this.cardModel.findById(id).exec();
    if (!card) return null;
    return this._getCardDetails(card);
  }

  async findByCardNumber(number: string): Promise<CardDocument | null> {
    return this.cardModel.findOne({number}).exec();
  }

  async create(
    name: string,
    number: string,
    description: string
  ): Promise<CardDocument> {

    const existingNumber = await this.findByCardNumber(number);
    if (existingNumber)
      throw new BadRequestException('Exist Card Number');

    const newCard = new this.cardModel({name, number, description});
    return newCard.save();
  }

  async update(
    id: string,
    name: string,
    number: string,
    description: string
  ): Promise<CardDocument> {
    let existCard = await this.find(id);
    existCard.name = name ?? existCard.name;
    existCard.number = number ?? existCard.number;
    existCard.description = description ?? existCard.description;

    return existCard.save();
  }

  async delete(id: string) {
    return this.cardModel.deleteOne({_id: id}).exec();
  }

  async deleteAll(idList: string[]) {
    return this.cardModel.deleteMany({_id:{$in: idList}});
  }

  // async getSummary() {
  //   return this.cardModel.
  // }

}
