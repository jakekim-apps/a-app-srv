import { InjectModel } from "@nestjs/mongoose";
import { CategoryDocument } from "./category.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { CategoryDetails } from "./category-details.interface";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  _getCategoryDetails(category: CategoryDocument): CategoryDetails {
    return <CategoryDetails>{
      id: category._id,
      name: category.name,
      description: category.description,
      type: category.type,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    }
  }

  async findAll(): Promise<CategoryDocument[]> {
    return this.categoryModel.find().exec();
  }

  async find(id: string): Promise<CategoryDocument> {
    return this.categoryModel.findById(id).exec();
  }

  async create(
    name: string,
    description: string,
    type: string
  ): Promise<CategoryDocument> {
    const newCategory = new this.categoryModel({ name, description, type });
    return newCategory.save();
  }

  async update(
    id: string,
    newName: string,
    newDescription: string,
    newType: string
  ): Promise<CategoryDocument> {
    let existCategory = await this.find(id);
    existCategory.name = newName ?? existCategory.name;
    existCategory.description = newDescription ?? existCategory.description;
    existCategory.type = newType ?? existCategory.type;

    return existCategory.save();
  }

  async delete(id: string) {
    return this.categoryModel.deleteOne({ _id: id }).exec();
  }
}
