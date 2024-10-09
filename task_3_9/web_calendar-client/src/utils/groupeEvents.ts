import { add, isSameDay, isWithinInterval } from 'date-fns';
import { Event } from '../types/types';

export type GroupedEvents = {
    eventGroups: Event[][];
};

export const groupEvents = (
    events: Event[],
    date?: Date // Optional date parameter
): GroupedEvents => {
    // If a date is provided, filter the events for that specific day
    const eventsToGroup = date
        ? events.filter((event) => isSameDay(event.start_date, date))
        : events;

    // Sort the events by start date
    const sortedEvents = eventsToGroup.sort(
        (a, b) => a.start_date.getTime() - b.start_date.getTime()
    );

    // Helper function to create groups
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

    // Group the events and return
    const eventGroups = createGroups(sortedEvents);
    return { eventGroups };
};
