import { useContext, useState } from 'react';
import { endOfDay, startOfDay, eachHourOfInterval, isSameDay } from 'date-fns';

import { cn } from 'src/utils/utils';
import { Event } from 'src/types/types';
import DayEvent from 'src/components/features/DayEvent';
import { Context } from 'src/context/context';
import { createGroups } from 'src/utils/groupeEventsForWeekView';

export type WeekDayProps = {
  day: Date;
  events?: Event[];
};

const WeekDay: React.FC<WeekDayProps> = ({ day }) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const { events } = useContext(Context)!;

  const dayEvents = events.filter((event) => isSameDay(event.date, day));

  const dayGroups = createGroups(dayEvents);

  const hours = eachHourOfInterval({
    start: startOfDay(day),
    end: endOfDay(day),
  });

  return (
    <div
      aria-label={'Events slot for ' + day.toDateString()}
      className='min-w-36 flex flex-1 relative'
    >
      <div className='w-[100%] h-full absolute'>
        <div className='w-full h-full relative' ref={(ref) => setRef(ref)}>
          {dayGroups.map((group) => {
            return group.map((event, index) => (
              <DayEvent
                day={day}
                event={event}
                index={index}
                key={event.id}
                grouplength={group.length}
                containerHeight={ref?.offsetHeight || 1}
              />
            ));
          })}
        </div>
      </div>
      <div className='w-full flex flex-col'>
        {hours.map((time, index) => (
          <div
            key={time.toISOString()}
            className={cn(
              'h-14 w-full border-l',
              index !== hours.length - 1 && 'border-b'
            )}
          />
        ))}
      </div>
    </div>
  );
};
export default WeekDay;
