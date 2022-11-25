import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    userId: string;

    @Column()
    userName: string;

    @IsEmail()
    @Column()
    email: string;

    
    @Column()
    password: string

    @Column({ default: 0})
    role: number
}