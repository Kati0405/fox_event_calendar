import { IsNotEmpty, IsString, IsDateString, IsBoolean } from '@nestjs/class-validator';

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsNotEmpty()
    @IsDateString()
    start_time: string;

    @IsNotEmpty()
    @IsDateString()
    end_time: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    calendarId: string;

    @IsBoolean()
    isAllDay: boolean;
}
