import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password)
        if (isMatch) {
          const { password, ...result } = user;
          return result;
        } else {
          throw new HttpException("Password is incorrect.", 400, { cause: new Error("Password")});
        }
    } else {
      throw new HttpException("This email already exists.", 400, { cause: new Error("Email")});
    }
    return {
      message: "Please check information"
    };
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(): Promise<any> {
    return null;
  }
}
