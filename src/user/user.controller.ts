import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDetails } from "./user-details.interface";
import { UserDocument } from "./user.schema";

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  getUsers(
    @Query() query
  ) {
    return this.userService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string
  ): Promise<UserDocument> {
    return this.userService.update(id, name, email, phone);
  }
}
