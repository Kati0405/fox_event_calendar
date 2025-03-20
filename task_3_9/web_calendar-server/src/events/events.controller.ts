import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }


    @Get()
    async getEvents(@Req() req: Request | any) {
        const userId = req.user.id;
        return this.eventsService.getEvents(userId);
    }


    @Get(':id')
    async getEventById(@Param('id') id: string) {
        try {
            return await this.eventsService.getEventById(id);
        } catch (err) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
    }

    @Get('calendar/:calendarId')
    async getEventsByCalendarId(@Param('calendarId') calendarId: string) {
        try {
            return await this.eventsService.getEventsByCalendarId(calendarId);
        } catch (err) {
            throw new NotFoundException(`No events found for calendar ID ${calendarId}`);
        }
    }

    @Post()
    async createEvent(@Body() createEventDto: CreateEventDto, @Req() req: Request | any) {
        try {
            const userId = req.user.id;
            return await this.eventsService.createEvent(createEventDto, userId);
        } catch (err) {
            throw new BadRequestException('Invalid event data provided');
        }
    }

    @Put(':id')
    async updateEvent(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
        try {
            return await this.eventsService.updateEvent(id, updateEventDto);
        } catch (err) {
            throw new BadRequestException(`Event with ID ${id} not found for update`);
        }
    }
    @Delete(':id')
    async deleteEvent(@Param('id') id: string) {
        try {
            return await this.eventsService.deleteEvent(id);
        } catch (err) {
            throw new BadRequestException(`Event with ID ${id} not found for deletion`);
        }
    }
}
