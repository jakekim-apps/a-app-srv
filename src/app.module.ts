import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';
import { AccountModule } from './account/account.module';
import { HistoryModule } from './history/history.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoggerMiddleware } from "./core/logger.middleware";


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/a-app', {loggerLevel: "debug"}),
    CategoryModule,
    UserModule,
    AuthModule,
    CardModule,
    AccountModule,
    HistoryModule,
    DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
