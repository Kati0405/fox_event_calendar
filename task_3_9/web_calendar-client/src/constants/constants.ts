import { Event } from "../types/types";
import { add, addDays, startOfToday, subDays } from "date-fns";

export const events: Event[] = [
    {
        id: "0",
        start_date: add(new Date(2024, 9, 13), { hours: 12, minutes: 30 }),
        end_date: add(new Date(2024, 9, 13), { hours: 13, minutes: 30 }),
        title: "Zero",
    },
    {
        id: "1",
        start_date: add(startOfToday(), { hours: 12, minutes: 30 }),
        end_date: add(startOfToday(), { hours: 13, minutes: 30 }),
        title: "First",
    },
    {
        id: "2",
        start_date: add(startOfToday(), { hours: 12, minutes: 45 }),
        end_date: add(startOfToday(), { hours: 13, minutes: 30 }),
        title: "Second",
    },
    {
        id: "3",
        start_date: add(startOfToday(), { hours: 13 }),
        end_date: add(startOfToday(), { hours: 13, minutes: 45 }),
        title: "Third",
    },
    {
        id: "4",
        start_date: add(startOfToday(), { hours: 13, minutes: 15 }),
        end_date: add(startOfToday(), { hours: 14, minutes: 15 }),
        title: "Fourth",
    },
    {
        id: "5",
        start_date: add(startOfToday(), { hours: 15, minutes: 30 }),
        end_date: add(startOfToday(), { hours: 15, minutes: 55 }),
        title: "Fifths",
    },
    {
        id: "6",
        start_date: add(startOfToday(), { hours: 12, minutes: 30 }),
        end_date: add(startOfToday(), { hours: 13, minutes: 30 }),
        title: "Today's Event",
    },
    {
        id: "7",
        start_date: add(subDays(startOfToday(), 1), { hours: 9, minutes: 0 }),
        end_date: add(subDays(startOfToday(), 1), { hours: 10, minutes: 0 }),
        title: "Yesterday's Event",
    },
    {
        id: "8",
        start_date: add(addDays(startOfToday(), 1), { hours: 14, minutes: 0 }),
        end_date: add(addDays(startOfToday(), 1), { hours: 15, minutes: 0 }),
        title: "Tomorrow's Event",
    },
    {
        id: "9",
        start_date: add(addDays(startOfToday(), 2), { hours: 10, minutes: 30 }),
        end_date: add(addDays(startOfToday(), 2), { hours: 11, minutes: 30 }),
        title: "Day After Tomorrow's Event",
    },
    {
        id: "10",
        start_date: add(subDays(startOfToday(), 3), { hours: 16, minutes: 0 }),
        end_date: add(subDays(startOfToday(), 3), { hours: 17, minutes: 0 }),
        title: "3 Days Ago Event",
    },

];