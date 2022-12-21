import { Controller, Get } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}


// 등록된 모든 종류 계좌
  @Get()
  findAllAccounts(

  ) {

  }

  @Get()
  getSummary() {}


  // find all registered accounts
  // monthly spendingSummary
  // - category
  // - accounts

}
