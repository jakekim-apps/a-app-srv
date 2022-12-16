import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";

import * as bcrypt from 'bcrypt';
import { NewUserDto } from "../user/dtos/new-user.dto";
import { UserDetails } from "../user/user-details.interface";
import { ExistingUserDto } from "../user/dtos/existing-user.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {

  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<NewUserDto>): Promise<UserDetails | any> {
    const { name, email, password, phone } = user;

    const existingEmail = await this.userService.findByEmail(email);
    if (existingEmail)
      throw new BadRequestException(`email: ${email} 은 이미 등록된 email 입니다.`);
    const existingPhone = await this.userService.findByPhone(phone);
    if (existingPhone)
      throw new BadRequestException(`phone: ${phone} 은 이미 등록된 phone 입니다.`);

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(name, email, hashedPassword, phone);
    return this.userService._getUserDetails(newUser);
  }

  async dosePasswordMatch(password: string, hashedPassword: string): Promise<Boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);
    const doseUserExist = !!user;

    if (!doseUserExist)
        throw new BadRequestException( 'Not registered email');

    const dosePasswordMatch = await this.dosePasswordMatch(password, user.password);

    if (!dosePasswordMatch)
        throw new BadRequestException( 'Email or Password not corrected');

    return this.userService._getUserDetails(user);
  }

  async login(existingUser: ExistingUserDto): Promise<{token: string} | null> {
    const {email, password} = existingUser;
    const user = await this.validateUser(email, password);

    if (!user)
      throw new BadRequestException(`email 또는 password가 잘못되었습니다.`);

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt };
  }
}
