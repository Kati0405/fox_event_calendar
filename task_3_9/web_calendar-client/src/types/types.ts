export type User = {
    name: string;
    email: string;
    avatar: string;
}

export type Event = {
    id: string;
    title: string;
    date: Date;
    start_time: Date;
    end_time: Date;
    description: string;
    calendarId: string;
    isAllDay?: boolean
};

export type Calendar = {
    id: string;
    title: string;
    colorClass: string;
    isDefault?: boolean
}

export type Day = {
    date: Date;
    events?: Event[];
}
