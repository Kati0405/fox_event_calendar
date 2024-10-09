export interface User {
    name: string;
    email: string;
    avatar: string;
}

export type Event = {
    id: string;
    title: string;
    start_date: Date;
    end_date: Date;
};

export interface Day {
    date: Date;
    events?: Event[];
}
