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
        isWithinInterval(event.start_time, {
            start: first.start_time,
            end: add(first.end_time, { minutes: -1 }),
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
        (event) => isSameDay(event.start_time, date) && !event.isAllDay
    );

    const sortedEvents = eventsToday.sort(
        (a, b) =>
            new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );

    const eventGroups = createGroups(sortedEvents);

    return { eventGroups };
};
