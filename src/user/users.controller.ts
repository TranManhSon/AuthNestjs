import { Controller, Post, Body } from "@nestjs/common";
import { CreateUserDto } from "./dto/create_user.dto";
import { UsersService } from "./users.service";


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post('/register')
    async register(@Body() userData: CreateUserDto) {
        return this.usersService.createNewUser(userData);
    }
}
