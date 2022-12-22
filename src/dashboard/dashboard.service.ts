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


  async getSummary(queryParams) {
    const { startDate, endDate } = queryParams;

  }


}
