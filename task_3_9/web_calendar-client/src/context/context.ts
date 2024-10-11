import React, { createContext } from 'react';

import { Calendar, Day as DayType, Event } from '../types/types';

export const Context = createContext<{
    selectedView: string;
    setSelectedView: React.Dispatch<React.SetStateAction<string>>;
    currentMonth: number;
    currentWeek: DayType[];
    setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
    setCurrentWeek: React.Dispatch<React.SetStateAction<DayType[]>>;
    currentDay: DayType;
    setCurrentDay: React.Dispatch<React.SetStateAction<DayType>>;
    events: Event[]
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    calendars: Calendar[];
    setCalendars: React.Dispatch<React.SetStateAction<Calendar[]>>
} | null>(null);