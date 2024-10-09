import { add, isSameDay, isWithinInterval } from "date-fns";
import { Event } from '../types/types'

export type GroupedEvents = {
    eventGroups: Event[][];
};

const createGroups = (
    events: Event[],
    groupedEvents: Event[][] = []
): Event[][] => {
    if (events.length <= 0) return groupedEvents;

    const [first, ...rest] = events;

    const eventsInRange = rest.filter((event) =>
        isWithinInterval(event.start_date, {
            start: first.start_date,
            end: add(first.end_date, { minutes: -1 }),
        })
    );

    const group = [first, ...eventsInRange];

    const remainingEvents = rest.filter(
        (event) => !eventsInRange.includes(event)
    );

    groupedEvents.push(group);

    return createGroups(remainingEvents, groupedEvents);
};

export const groupEvents = (date: Date, events: Event[]): GroupedEvents => {
    const eventsToday = events.filter(
        (event) => isSameDay(event.start_date, date)
    );

    const sortedEvents = eventsToday.sort(
        (a, b) => a.start_date.getTime() - b.start_date.getTime()
    );

    const eventGroups = createGroups(sortedEvents);

    return { eventGroups };
};