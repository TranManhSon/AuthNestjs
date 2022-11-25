import { Controller, Request, Post, UseGuards, Get, Res } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req ,@Res({passthrough:true}) res): Promise<any> {
    const  jwt = await this.authService.login(req.user)
    res.cookie('auth-cookie', jwt.access_token , {maxAge: 36000, httpOnly: true });
    // return this.authService.login(req.user);
    return {
      "message":"login success"
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getProfile')
  async getProfile(@Request() req, @Res() res): Promise<any> {
      return null;
  }
}