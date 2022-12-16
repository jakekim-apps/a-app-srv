import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { MongooseModule } from "@nestjs/mongoose";
import { AccountSchema } from "./account.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule {}
