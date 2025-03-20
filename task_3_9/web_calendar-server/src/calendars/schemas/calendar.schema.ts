import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CalendarDocument = Calendar & Document;

@Schema()
export class Calendar {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    colorClass: string;

    @Prop({ default: false })
    isDefault: boolean;

    @Prop()
    userId: string;
}

export const CalendarSchema = SchemaFactory.createForClass(Calendar);
