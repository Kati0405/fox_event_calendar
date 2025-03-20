import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true, type: Date })
    date: Date;

    @Prop({ required: true, type: Date })
    start_time: Date;

    @Prop({ required: true, type: Date })
    end_time: Date;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    calendarId: string;

    @Prop({ default: false })
    isAllDay?: boolean;

    @Prop({ required: true })
    userId: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
