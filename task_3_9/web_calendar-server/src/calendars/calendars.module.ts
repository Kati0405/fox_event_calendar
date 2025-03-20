import { Module } from '@nestjs/common';
import { CalendarsService } from './calendars.service';
import { CalendarsController } from './calendars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Calendar, CalendarSchema } from './schemas/calendar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Calendar.name, schema: CalendarSchema }]),
  ],
  providers: [CalendarsService],
  controllers: [CalendarsController],
})
export class CalendarsModule { }
