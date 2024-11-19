import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { CalendarsService } from './calendars.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('calendars')
@UseGuards(JwtAuthGuard)
export class CalendarsController {
  constructor(private readonly calendarsService: CalendarsService) { }

  @Get()
  getCalendars(@Req() req: Request | any) {
    const userId = req.user.id;
    return this.calendarsService.getCalendars(userId);
  }

  @Get(':id')
  getCalendarById(@Param('id') id: string) {
    try {
      return this.calendarsService.getCalendarById(id);
    } catch (err) {
      throw new NotFoundException(`Calendar with ID ${id} not found`)
    }
  }

  @Post()
  createCalendar(@Body() createCalendarDto: CreateCalendarDto, @Req() req: Request | any) {
    createCalendarDto.userId = req.user.id;
    return this.calendarsService.createCalendar(createCalendarDto);
  }


  @Put(':id')
  updateCalendar(@Param('id') id: string, @Body() updateCalendarDto: UpdateCalendarDto) {
    return this.calendarsService.updateCalendar(id, updateCalendarDto);
  }

  @Delete(':id')
  deleteCalendar(@Param('id') id: string) {
    return this.calendarsService.deleteCalendar(id);
  }
}
