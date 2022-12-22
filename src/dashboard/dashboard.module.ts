import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AccountModule } from "../account/account.module";
import { CardModule } from "../card/card.module";
import { CategoryModule } from "../category/category.module";
import { HistoryModule } from "../history/history.module";

@Module({
  providers: [DashboardService],
  imports: [AccountModule, CardModule, CategoryModule, HistoryModule],
  controllers: [DashboardController]
})
export class DashboardModule {}
