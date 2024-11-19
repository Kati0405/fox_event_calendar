import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    login(userId: string) {
        const payload: AuthJwtPayload = {
            sub: userId
        };
        const token = this.jwtService.sign(payload);
        return { accessToken: token };
    }

    async validateGoogleUser(googleUser: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(googleUser.email);
        if (user) return user;
        return await this.usersService.createUser(googleUser);
    }
}
