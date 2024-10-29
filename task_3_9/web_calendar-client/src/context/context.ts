import { createContext, Dispatch, SetStateAction } from 'react';
import { Calendar, Day as DayType, Event } from '../types/types';

interface CalendarContext {
    selectedView: string;
    setSelectedView: Dispatch<SetStateAction<string>>;
    currentMonth: number;
    setCurrentMonth: Dispatch<SetStateAction<number>>;
    currentWeek: DayType[];
    setCurrentWeek: Dispatch<SetStateAction<DayType[]>>;
    currentDay: DayType;
    setCurrentDay: Dispatch<SetStateAction<DayType>>;
    events: Event[];
    setEvents: Dispatch<SetStateAction<Event[]>>;
    calendars: Calendar[];
    setCalendars: Dispatch<SetStateAction<Calendar[]>>;
    checkedCalendars: string[];
    setCheckedCalendars: Dispatch<SetStateAction<string[]>>;
}

export const Context = createContext<CalendarContext | null>(null);
