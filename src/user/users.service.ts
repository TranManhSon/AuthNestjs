import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { User } from "./users.entity";
import { IUser } from "./users.interface";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

import { CreateUserDto} from "./dto/create_user.dto";


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOneByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({email})
    }

    async createNewUser(userData: CreateUserDto ): Promise<IUser> {
        try {
            const { userName, email, password, confirm} = userData;


            const _user = await this.usersRepository.findOneBy({email});

            if (_user) {
                throw new HttpException("This email already exists.", 400, { cause: new Error("Email")});
            }

            if (password != confirm) {
                throw new HttpException("Confirm password is not match.", 400, { cause: new Error("Email")});
            }

            const hashPassword = await bcrypt.hash(password, 12);

            const newUser = new User();
            newUser.userName = userName;
            newUser.email = email;
            newUser.password = hashPassword;

            const savedUser = await this.usersRepository.save(newUser);

            console.log(savedUser)

            return this.buildIUser(savedUser);
        } catch (error) {
            throw new HttpException( error, HttpStatus.BAD_REQUEST)
        }
    }

    private buildIUser(user: User) {
        const userI = {
          userId: user.userId,
          userName: user.userName,
          email: user.email,
          token: null,
          role: user.role
        };

        return userI;
    }

    async logout(payload) {
        console.log(payload)
    }
}