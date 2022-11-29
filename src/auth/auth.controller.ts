import { Controller, Request, Post, UseGuards, Get, Res } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from 'src/decorator/getUser.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req ,@Res({passthrough:true}) res): Promise<any> {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  public async logout( @Request() req, @Res({passthrough:true}) res): Promise<any> {
    this.authService.logout(req.user);
    return {
          message: "logout"
        }
    }

  @UseGuards(JwtAuthGuard)
  @Get('/user/me')
  async getProfile(@GetUser('userId') userId: any): Promise<any> {
      // console.log(userId)
      return null;
  }
}