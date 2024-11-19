import { BadRequestException, Injectable } from '@nestjs/common';
import { allowedColors, CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Calendar, CalendarDocument } from './schemas/calendar.schema';

@Injectable()
export class CalendarsService {
  constructor(@InjectModel(Calendar.name) private calendarModel: Model<CalendarDocument>) { }

  async getCalendars(userId: string) {
    return this.calendarModel.find({ userId }).exec();
  }

  async getCalendarById(id: string) {
    return this.calendarModel.findById(id).exec();
  }

  async createCalendar(createCalendarDto: CreateCalendarDto) {
    if (!allowedColors.includes(createCalendarDto.colorClass)) {
      throw new BadRequestException(`Color ${createCalendarDto.colorClass} is not allowed.`);
    }
    const newCalendar = new this.calendarModel({
      ...createCalendarDto,
      isDefault: false,
    });
    return newCalendar.save();
  }

  async updateCalendar(id: string, updateCalendarDto: UpdateCalendarDto) {
    const updatedCalendar = await this.calendarModel
      .findByIdAndUpdate(id, updateCalendarDto, { new: true })
      .exec();
    console.log(updatedCalendar)
    return updatedCalendar;
  }

  async deleteCalendar(id: string) {
    const deletedCalendar = await this.calendarModel.findByIdAndDelete(id).exec();
    return deletedCalendar;
  }


  // createCalendar(createCalendarDto: CreateCalendarDto) {
  //   if (!allowedColors.includes(createCalendarDto.colorClass)) {
  //     throw new BadRequestException(`Color ${createCalendarDto.colorClass} is not allowed.`);
  //   }
  //   const newCalendar = { id: uuidv4(), isDefault: false, ...createCalendarDto }
  //   this.calendars.push(newCalendar)
  //   return newCalendar
  // }
  // updateCalendar(id: string, updateCalendarDto: UpdateCalendarDto) {
  //   this.calendars = this.calendars.map((calendar) => {
  //     if (calendar.id === id) {
  //       return { ...calendar, ...updateCalendarDto }
  //     }
  //     return calendar
  //   })
  //   return this.getCalendarById(id)
  // }


  // getCalendarById(id: string) {
  //   const calendar = this.calendars.find((calendar) => calendar.id === id);
  //   return calendar
  // }

  // private calendars: Array<{
  //   id: string;
  //   title: string;
  //   colorClass: string;
  //   isDefault?: boolean;
  // }> = [
  //     { id: '0', title: 'Default Calendar', colorClass: 'yellow', isDefault: true },
  //     { id: '1', title: 'Calendar 1', colorClass: 'green' },
  //     { id: '2', title: 'Calendar 2', colorClass: 'blue' },
  //   ];


  // getCalendars() {
  //   return this.calendars
  // }
  // deleteCalendar(id: string) {
  //   const toBeDeleted = this.getCalendarById(id)
  //   this.calendars = this.calendars.filter((calendar) => calendar.id !== id)
  //   return toBeDeleted
  // }

}
