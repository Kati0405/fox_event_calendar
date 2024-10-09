import React, { createContext } from 'react';

import { Day as DayType, Event } from '../types/types';

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
} | null>(null);