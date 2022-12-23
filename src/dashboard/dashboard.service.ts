import { Injectable } from '@nestjs/common';
import { AccountService } from "../account/account.service";
import { CategoryService } from "../category/category.service";
import { CardService } from "../card/card.service";
import { HistoryService } from "../history/history.service";

@Injectable()
export class DashboardService {
  constructor(
    private accountService: AccountService,
    private cardService: CardService,
    private categoryService: CategoryService,
    private historyService: HistoryService
  ) {}


  async getTotalSummary(queryParams) {
    const { startDate, endDate } = queryParams;
    // total reve, spen
    // monthly
    return this.historyService.getTotalSummary()

  }

  async getCategorySummary(q) {
    return this.historyService.getCategorySummary()
  }

  async getTypeSummary() {
    return this.historyService.getTypeSummary()
  }

}
