import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Inject, Injectable } from "@nestjs/common";
import googleOAuthConfig from "../config/google-oauth.config";
import { ConfigType } from "@nestjs/config";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(googleOAuthConfig.KEY) private googleConfiguration: ConfigType<typeof googleOAuthConfig>, private authService: AuthService
    ) {
        super({
            clientID: googleConfiguration.clientID,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackURL,
            scope: ['email', 'profile'],
        })
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        console.log({ profile })
        const user = await this.authService.validateGoogleUser({
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            pictureUrl: profile.photos[0].value,
            password: '',
        });
        done(null, user);
    }
}