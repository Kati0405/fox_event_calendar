export interface User {
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
};

export type Calendar = {
    id: string;
    title: string;
    color: string;
}

export interface Day {
    date: Date;
    events?: Event[];
}
