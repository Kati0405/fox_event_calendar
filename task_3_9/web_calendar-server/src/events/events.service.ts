import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';

@Injectable()
export class EventsService {
    constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) { }

    async getEvents(userId: string) {
        return this.eventModel.find({ userId }).exec();
    }

    async getEventsByCalendarId(calendarId: string) {
        return this.eventModel.find({ calendarId }).exec();
    }

    async getEventById(id: string) {
        const event = await this.eventModel.findById(id).exec();
        if (!event) {
            throw new BadRequestException(`Event with id ${id} not found.`);
        }
        return event;
    }

    async createEvent(createEventDto: CreateEventDto, userId: string) {
        const { start_time, end_time } = createEventDto;

        const startTime = new Date(start_time);
        const endTime = new Date(end_time);

        if (startTime >= endTime) {
            throw new BadRequestException('End time must be later than start time.');
        }

        const newEvent = new this.eventModel({
            ...createEventDto,
            userId,
            start_time: startTime,
            end_time: endTime,
        });

        console.log(newEvent)

        return newEvent.save();
    }

    async updateEvent(id: string, updateEventDto: UpdateEventDto) {
        const { start_time, end_time } = updateEventDto;

        if (start_time && end_time) {
            const startTime = new Date(start_time);
            const endTime = new Date(end_time);

            if (startTime >= endTime) {
                throw new BadRequestException('End time must be later than start time.');
            }

            updateEventDto.start_time = startTime.toISOString();
            updateEventDto.end_time = endTime.toISOString();
        }

        const updatedEvent = await this.eventModel
            .findByIdAndUpdate(id, updateEventDto, { new: true })
            .exec();

        if (!updatedEvent) {
            throw new BadRequestException(`Event with id ${id} not found.`);
        }

        return updatedEvent;
    }



    async deleteEvent(id: string) {
        const deletedEvent = await this.eventModel.findByIdAndDelete(id).exec();
        if (!deletedEvent) {
            throw new BadRequestException(`Event with id ${id} not found.`);
        }
        return deletedEvent;
    }

}
