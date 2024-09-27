import dayjs from "dayjs";

import { Day as DayType, Event } from '../components/Day/Day'


export const getMonth = (month = dayjs().month()): DayType[][] => {
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;

    const daysMatrix: DayType[][] = new Array(5).fill(null).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return {
                date: dayjs(new Date(year, month, currentMonthCount)).toDate(),
            };
        });
    });

    return daysMatrix;
};


export const getWeek = (date: dayjs.Dayjs = dayjs(), events: Event[] = []): DayType[] => {
    const startOfWeek = date.startOf('week');

    const weekDays: DayType[] = Array.from({ length: 7 }, (_, index) => {
        const dayDate = startOfWeek.add(index, 'day').toDate();

        const dayEvents = events.filter(
            (event) => event.date === dayjs(dayDate).format('YYYY-MM-DD')
        );

        return {
            date: dayDate,
            events: dayEvents,
        };
    });

    return weekDays;
};

