import { Calendar, Event } from "../types/types";
import { add, addDays, startOfToday, subDays } from "date-fns";

export const colors = [
    '#9F2957', '#D90056', '#E25D33', '#DFC45A', '#B8C42F', '#16AF6E', '#429488', '#397E49', '#439BDF', '#4254AF', '#6C7AC4', '#8332A4'
]

export const calendars: Calendar[] = [
    {
        id: '0',
        title: 'Calendar 0',
        color: '#DFC45A'
    },
    {
        id: '1',
        title: 'Calendar 1',
        color: '#429488'
    },
    {
        id: '2',
        title: 'Calendar 2',
        color: '#6C7AC4'
    },
]

export const events: Event[] = [
    {
        id: "0",
        date: new Date(2024, 9, 13),
        start_time: add(new Date(2024, 9, 13), { hours: 12, minutes: 30 }),
        end_time: add(new Date(2024, 9, 13), { hours: 13, minutes: 30 }),
        title: "Zero",
        description: "This is the description for Zero.",
        calendarId: "0",
    },
    {
        id: "1",
        date: startOfToday(),
        start_time: add(startOfToday(), { hours: 12, minutes: 30 }),
        end_time: add(startOfToday(), { hours: 13, minutes: 30 }),
        title: "First",
        description: "This is the description for First.",
        calendarId: "0",
    },
    {
        id: "2",
        date: startOfToday(),
        start_time: add(startOfToday(), { hours: 12, minutes: 45 }),
        end_time: add(startOfToday(), { hours: 13, minutes: 30 }),
        title: "Second",
        description: "This is the description for Second.",
        calendarId: "0",
    },
    {
        id: "3",
        date: startOfToday(),
        start_time: add(startOfToday(), { hours: 13 }),
        end_time: add(startOfToday(), { hours: 13, minutes: 45 }),
        title: "Third",
        description: "This is the description for Third.",
        calendarId: "0",
    },
    {
        id: "4",
        date: startOfToday(),
        start_time: add(startOfToday(), { hours: 13, minutes: 15 }),
        end_time: add(startOfToday(), { hours: 14, minutes: 15 }),
        title: "Fourth",
        description: "This is the description for Fourth.",
        calendarId: "0",
    },
    {
        id: "5",
        date: startOfToday(),
        start_time: add(startOfToday(), { hours: 15, minutes: 30 }),
        end_time: add(startOfToday(), { hours: 15, minutes: 55 }),
        title: "Fifths",
        description: "This is the description for Fifths.",
        calendarId: "0",
    },
    {
        id: "6",
        date: startOfToday(),
        start_time: add(startOfToday(), { hours: 12, minutes: 30 }),
        end_time: add(startOfToday(), { hours: 13, minutes: 30 }),
        title: "Today's Event",
        description: "This is the description for Today's Event.",
        calendarId: "0",
    },
    {
        id: "7",
        date: subDays(startOfToday(), 1),
        start_time: add(subDays(startOfToday(), 1), { hours: 9, minutes: 0 }),
        end_time: add(subDays(startOfToday(), 1), { hours: 10, minutes: 0 }),
        title: "Yesterday's Event",
        description: "This is the description for Yesterday's Event.",
        calendarId: "0",
    },
    {
        id: "8",
        date: addDays(startOfToday(), 1),
        start_time: add(addDays(startOfToday(), 1), { hours: 14, minutes: 0 }),
        end_time: add(addDays(startOfToday(), 1), { hours: 15, minutes: 0 }),
        title: "Tomorrow's Event",
        description: "This is the description for Tomorrow's Event.",
        calendarId: "1",
    },
    {
        id: "9",
        date: addDays(startOfToday(), 2),
        start_time: add(addDays(startOfToday(), 2), { hours: 10, minutes: 30 }),
        end_time: add(addDays(startOfToday(), 2), { hours: 11, minutes: 30 }),
        title: "Day After Tomorrow's Event",
        description: "This is the description for Day After Tomorrow's Event.",
        calendarId: "2",
    },
    {
        id: "10",
        date: subDays(startOfToday(), 3),
        start_time: add(subDays(startOfToday(), 3), { hours: 16, minutes: 0 }),
        end_time: add(subDays(startOfToday(), 3), { hours: 17, minutes: 0 }),
        title: "3 Days Ago Event",
        description: "This is the description for 3 Days Ago Event.",
        calendarId: "2",
    },
];
