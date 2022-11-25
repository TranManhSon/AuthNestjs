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
        }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}




    
//       async login(userData: any) {

//         const payload = { username: userData.username, sub: userData.id };
//         // const payload = { email: userData.email, password: userData.password};
//         // const user = await this.usersService.findOneByEmail(payload.email);
//         // if (!user) {
//         //   throw new HttpException("This email already exists.", 400, { cause: new Error("Email")});
//         // }
//         // const isMatch = await bcrypt.compare(payload.password, user.password);
//         // if(isMatch) {
//         //   throw new HttpException("Password is incorrect.", 400, { cause: new Error("Password")});
//         // }
//         return {
//           access_token: this.jwtService.sign(payload),
//         };
//       }
// }