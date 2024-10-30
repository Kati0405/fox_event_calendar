import { useContext } from 'react';

import {
  format,
  endOfDay,
  startOfDay,
  eachHourOfInterval,
  isSameDay,
} from 'date-fns';
import { Event, Day as DayType } from 'src/types/types';
import WeekDayLabel from 'src/components/features/WeekDayLabel';
import WeekDay from '../WeekDay';

import { Context } from 'src/context/context';
import TimeLine from 'src/components/features/TimeLine';
import { createGroups } from 'src/utils/groupeEventsForWeekView';

export type Week = DayType[];

export interface WeekProps {
  date: Date;
  events?: Event[];
}

const Week: React.FC<WeekProps> = () => {
  const { events, currentWeek } = useContext(Context)!;

  const hours = eachHourOfInterval({
    start: startOfDay(currentWeek[0].date),
    end: endOfDay(currentWeek[0].date),
  });

  const today = new Date();
  const containerHeight = hours.length * 56;

  const groupedEventsByDay = currentWeek.reduce((acc, day) => {
    const dayEvents = events.filter((event) => isSameDay(event.date, day.date));
    acc[day.date.toISOString()] = createGroups(dayEvents);
    return acc;
  }, {} as { [key: string]: Event[][] });

  return (
    <section
      id='calendar-day-view'
      className='flex-1 h-full w-3/4 bg-white rounded-lg'
    >
      <div className='min-w-[calc(96px+(144px*7))] flex border-b'>
        <div className='min-w-24 h-14 flex justify-center items-center'></div>
        <div className='flex flex-col flex-1'>
          <div className='relative flex flex-1'>
            {currentWeek.map((day) => (
              <WeekDayLabel
                date={day.date}
                key={'week-day-label-' + day.date.toISOString()}
                events={events}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='min-w-[calc(96px+(150px*7))] flex'>
        <div className='h-fit flex flex-col'>
          {hours.map((time, index) => (
            <div
              key={time.toISOString() + index}
              aria-label={format(time, 'h a')}
              className='min-h-14 w-24 flex items-start justify-center'
            >
              <time
                className='text-xs -m-3 select-none'
                dateTime={format(time, 'yyyy-MM-dd')}
              >
                {index === 0 ? '' : format(time, 'h a').toLowerCase()}
              </time>
            </div>
          ))}
        </div>
        <div className='flex flex-1 h-fit'>
          {currentWeek.map((day) => {
            const iso = day.date.toISOString();
            const dayEvents = groupedEventsByDay[iso] || [];
            return (
              <div key={iso} className='relative flex-1'>
                <WeekDay day={day.date} events={dayEvents.flat()} />
                {isSameDay(day.date, today) && (
                  <TimeLine containerHeight={containerHeight} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Week;
