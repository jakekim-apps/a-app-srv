import { InjectModel } from "@nestjs/mongoose";
import { CategoryDocument } from "./category.schema";
import { Injectable } from "@nestjs/common";
import { CategoryDetails } from "./category-details.interface";
import { PaginateModel } from 'mongoose';
import { paginationLabels } from "../utils/pagination.interface";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: PaginateModel<CategoryDocument>,
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

  async findAll() {
    return this.categoryModel.paginate({}, {page: 1, limit: 10, sort: {createdAt: -1}, customLabels: paginationLabels})
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
