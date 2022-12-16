import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDocument } from "./category.schema";
import { JwtGuard } from "../auth/guards/jwt.guard";

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createCategory(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('type') type: string,
  ): Promise<CategoryDocument> {
    return this.categoryService.create(name, description, type);
  }

  @Get()
  findAllCategories() {
    return this.categoryService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findCategory(@Param('id') id: string): Promise<CategoryDocument> {
    return this.categoryService.find(id);
  }

  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('type') type: string,
  ): Promise<CategoryDocument> {
    return this.categoryService.update(id, name, description, type);
  }

  @Delete(':id')
  deleteCategory(
    @Param('id') id: string
  ) {
    return this.categoryService.delete(id);
  }

}
