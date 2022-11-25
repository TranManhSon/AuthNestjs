import { Controller, Get, Post, Req, Param, Body, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create_user.dto";
import { UsersService } from "./users.service";
import { HttpException } from "@nestjs/common";
import { Request } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/register')
    async register(@Body() userData: CreateUserDto) {
        return this.usersService.createNewUser(userData);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout(@Req() request: Request): Promise<any> {
        return this.usersService.logout(request)
    }
}