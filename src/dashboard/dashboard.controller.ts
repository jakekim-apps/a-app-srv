import { Controller, Get, Query } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  // 1. 월간 통계
  //   - total income, total expenditure
  //   - 전월 대비 증감량
  //
  // 2. account list and balance
  // 3. card list and expenditure
  //
  // 4. graph data
  //   - daily spending and income
  //   - each category spending
  // 5.
  @Get()
  getSummary(
    @Query() query
  ) {
    return this.dashboardService.getSummary(query);
  }


  // 등록된 모든 종류 계좌
  @Get()
  findAllAccounts(

  ) {

  }


  // find all registered accounts
  // monthly spendingSummary
  // - category
  // - accounts

}
