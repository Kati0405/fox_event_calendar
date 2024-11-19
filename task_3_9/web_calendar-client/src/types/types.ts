import { RepeatOptions } from "@/constants/constants";

export type User = {
    _id: string,
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
}

export type Event = {
    _id?: string,
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    description: string;
    calendarId: string;
    isAllDay?: boolean;
    repeatOption?: RepeatOptions
};

export type Calendar = {
    _id: string;
    title: string;
    colorClass: string;
    isDefault?: boolean;
    userId: string
}

export type Day = {
    date: Date;
    events?: Event[];
}
