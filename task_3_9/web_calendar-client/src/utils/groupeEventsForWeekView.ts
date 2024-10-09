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
