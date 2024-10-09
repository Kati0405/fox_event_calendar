import { cn } from '../../../utils/utils';
import { endOfDay, startOfDay, eachHourOfInterval } from 'date-fns';
import { Event } from '../../../types/types';
import { DayEvent } from '../../day-view/DayEvent/DayEvent';
import { useContext, useState } from 'react';
import { Context } from '../../../context/context';
import { createGroups } from '../../../utils/groupeEventsForWeekView';

type WeekDayProps = {
  day: Date;
  events?: Event[];
};

export const WeekDay: React.FC<WeekDayProps> = ({ day }) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const { events } = useContext(Context)!;

  const hours = eachHourOfInterval({
    start: startOfDay(day),
    end: endOfDay(day),
  });

  const dayGroups = createGroups(events);

  return (
    <div
      aria-label={'Events slot for ' + day.toDateString()}
      className='min-w-36 flex flex-1 relative'
    >
      <div className='w-[100%] h-full absolute'>
        <div className='w-full h-full relative' ref={(ref) => setRef(ref)}>
          {dayGroups.map((group) => {
            // console.log(group.length);
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
