import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
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
    @Body('spendingType') spendingType: string,
    @Body('description') description: string,
    @Body('categoryId') categoryId: string
  ): Promise<HistoryDocument> {
    return this.historyService.create(date, amount, type, spendingType, description, categoryId);
  }

  @Get()
  findAllHistories(): Promise<HistoryDocument[]> {
    return this.historyService.findAll();
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
    @Body('spendingType') spendingType: string,
    @Body('description') description: string,
    @Body('categoryId') categoryId: string
  ): Promise<HistoryDocument> {
    return this.historyService.update(id, amount, type, spendingType, description, categoryId);
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
