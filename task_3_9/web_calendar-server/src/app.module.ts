import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { CalendarsModule } from './calendars/calendars.module';
import { AuthModule } from './auth/auth.module';
import googleOauthConfig from './auth/config/google-oauth.config';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleOauthConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    EventsModule,
    UsersModule,
    CalendarsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    mongoose.connection.on('connected', () => {
      this.logger.log('Connected to the database');
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error(`Database connection error: ${err}`);
    });
  }
}
