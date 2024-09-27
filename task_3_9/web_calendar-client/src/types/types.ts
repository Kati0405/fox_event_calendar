export interface User {
    name: string;
    email: string;
    avatar: string;
}

export interface Event {
    date: string;
    title: string;
    startTime: string;
    endTime: string;
}

export interface Day {
    date: Date;
    events?: Event[];
}
