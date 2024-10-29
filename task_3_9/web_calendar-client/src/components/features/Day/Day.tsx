import { useContext, useState } from 'react';
import {
  format,
  endOfDay,
  startOfDay,
  eachHourOfInterval,
  isToday,
} from 'date-fns';

import { Day as DayType } from '@/types/types';
import WeekDayLabel from '../WeekDayLabel';
import TimeLine from '@components/features/TimeLine';
import { groupEvents } from '@/utils/groupeEventsForDayView';
import DayEvent from '../DayEvent';
import { Context } from '@/context/context';
import { dateFormat } from '@/constants/constants';

const Day: React.FC<DayType> = ({ date }) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const { events } = useContext(Context)!;

  const hours = eachHourOfInterval({
    start: startOfDay(date),
    end: endOfDay(date),
  });

  const containerHeight = hours.length * 80;

  const { eventGroups } = groupEvents(date, events || []);

  return (
    <div className='flex flex-col w-3/4 bg-white rounded-lg'>
      <div className='border-b flex'>
        <div className='w-20 h-20'></div>
        <WeekDayLabel date={date} events={events} />
      </div>
      <div className='flex-1 max-h-full pb-28'>
        <div className='relative' ref={(ref) => setRef(ref)}>
          {isToday(date) && <TimeLine containerHeight={containerHeight} />}
          {eventGroups.map((group) =>
            group.map((event, index) => (
              <DayEvent
                day={date}
                event={event}
                index={index}
                key={event.id}
                grouplength={group.length}
                containerHeight={ref?.offsetHeight || 1}
              />
            ))
          )}
          {hours.map((time, index) => (
            <div className='h-20 flex' key={time.toISOString() + index}>
              <div className='h-full w-20 flex items-start justify-center'>
                <time
                  className='text-xs -m-3 select-none'
                  dateTime={format(time, dateFormat)}
                >
                  {index === 0 ? '' : format(time, 'h a').toLowerCase()}
                </time>
              </div>
              <div className='flex-1 relative border-b border-l' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Day;
