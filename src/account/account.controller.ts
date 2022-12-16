import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountDocument } from "./account.schema";

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  createAccount(
    @Body('name') name: string,
    @Body('number') number: string,
    @Body('description') description: string,
    @Body('balance') balance: number
  ): Promise<AccountDocument> {
    return this.accountService.create(name, number, balance, description);
  }

  @Get()
  findAllAccounts() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findAccount(@Param('id') id: string): Promise<AccountDocument> {
    return this.accountService.find(id);
  }

  @Patch(':id')
  updateAccount(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('number') number: string,
    @Body('description') description: string,
    @Body('balance') balance: number
  ): Promise<AccountDocument> {
    return this.accountService.update(id, name, number, balance, description);
  }

  @Delete(':id')
  deleteAccount(
    @Param('id') id: string
  ) {
    return this.accountService.delete(id);
  }

  @Delete()
  deleteAllAccounts(
    @Body('idList') idList: string[]
  ) {
    return this.accountService.deleteAll(idList);
  }
}
