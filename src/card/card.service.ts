import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { CardDocument } from "./card.schema";
import { Model } from "mongoose";
import { CardDetails } from "./card-details.interface";

@Injectable()
export class CardService {
  constructor(@InjectModel('Card') private readonly cardModel: Model<CardDocument>) {}

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

  async findAll(): Promise<CardDocument[]> {
    return this.cardModel.find().exec();
  }

  async find(id: string): Promise<CardDocument> {
    return this.cardModel.findById(id).exec();
  }

  async findById(id: string): Promise<CardDetails | null> {
    const card = await this.cardModel.findById(id).exec();
    if (!card) return null;
    return this._getCardDetails(card);
  }

  async create(
    name: string,
    number: string,
    description: string
  ): Promise<CardDocument> {
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

}
