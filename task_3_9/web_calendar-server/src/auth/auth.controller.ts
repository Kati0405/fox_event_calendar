import { Controller, Get, Post, Req, Request, Res, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./guards/google-auth/google-auth.guard";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    googleLogin() { }

    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    // async googleCallback(@Req() req) {
    //     const user = await this.authService.googleLogin(req.user);
    //     const token = this.authService.login(user.id);
    //     return { id: user.id, token };
    // }

    async googleCallback(@Req() req, @Res() res) {
        const response = await this.authService.login(req.user.id)
        res.redirect(`http://localhost:5173?token=${response.accessToken}`)
    }

    // @Post('login')
    // async login(@Request() req) {
    //     const token = this.authService.login(req.user.id)
    //     return { id: req.user.id, token }
    // }
}


