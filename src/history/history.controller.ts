import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { HistoryDocument } from "./history.schema";

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Post()
  createHistory(
    @Body('date') date: Date,
    @Body('amount') amount: number,
    @Body('type') type: string,
    @Body('targetType') targetType: string,
    @Body('targetId') targetId: string,
    @Body('description') description: string,
    @Body('categoryId') categoryId: string
  ): Promise<HistoryDocument> {
    return this.historyService.create(date, amount, type, targetType, targetId, description, categoryId);
  }

  @Get()
  findAllHistories(
    @Query() query
  ) {
    console.log(query)
    // page, size, text, type, targetType, targetId, categoryId, period

    return this.historyService.findAll(query);
  }

  @Get(':id')
  findHistory(@Param('id') id: string): Promise<HistoryDocument> {
    return this.historyService.find(id);
  }

  @Patch(':id')
  updateHistory(
    @Param('id') id: string,
    @Body('date') date: Date,
    @Body('amount') amount: number,
    @Body('type') type: string,
    @Body('targetType') targetType: string,
    @Body('targetId') targetId: string,
    @Body('description') description: string,
    @Body('categoryId') categoryId: string
  ): Promise<HistoryDocument> {
    return this.historyService.update(id, amount, type, targetType, targetId, description, categoryId);
  }

  @Delete(':id')
  deleteHistory(
    @Param('id') id: string
  ) {
    return this.historyService.delete(id);
  }

  @Delete()
  deleteAllHistories(
    @Body('idList') idList: string[]
  ) {
    return this.historyService.deleteAllHistories(idList);
  }

}
