import { IsEmail, IsOptional, IsString, IsUrl } from '@nestjs/class-validator';

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    pictureUrl?: string;

    @IsString()
    password: string;
}