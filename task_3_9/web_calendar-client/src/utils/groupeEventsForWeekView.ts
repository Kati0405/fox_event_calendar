import { add, isWithinInterval } from "date-fns";
import { Event } from '../types/types';

export type GroupedEvents = Event[][];

export const createGroups = (
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
        (event) => !eventsInRange.includes(event) && !event.isAllDay
    );

    groupedEvents.push(group);

    return createGroups(remainingEvents, groupedEvents);
};
