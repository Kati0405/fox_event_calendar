import { useState, useEffect, useContext } from 'react';
import { startOfDay, differenceInMinutes } from 'date-fns';

import { Context } from 'src/context/context';

const one_minute = 60 * 1000;
const minutes_in_day = 24 * 60;

export interface TimeLineProps {
  containerHeight: number;
}

const TimeLine: React.FC<TimeLineProps> = ({ containerHeight }) => {
  const [top, setTop] = useState(0);
  const today = new Date();
  const startOfToday = startOfDay(today);
  const { selectedView } = useContext(Context)!;

  useEffect(() => {
    const updateTop = () => {
      const minutesPassed = differenceInMinutes(today, startOfToday);
      const percentage = minutesPassed / minutes_in_day;
      const top = percentage * containerHeight;
      setTop(top);
    };
    updateTop();
    const interval = setInterval(() => updateTop(), one_minute);
    return () => clearInterval(interval);
  }, [containerHeight]);

  return (
    <div
      aria-hidden
      style={{ top }}
      aria-label='day time progress'
      className={`h-1 ${
        selectedView == 'Day' ? 'w-[123%]' : 'w-[126%]'
      } absolute -translate-y-1/2 ${
        selectedView === 'Day' ? 'left-[5.5rem]' : 'left-[0.5rem]'
      }`}
    >
      <div className='relative w-full h-full'>
        <div
          aria-label='current time dot'
          className='w-2 aspect-square rounded-full absolute -left-2 top-1/2 -translate-y-1/2  bg-[#FF5620]'
        />
        <div
          aria-label='current time line'
          className='h-[1px] w-3/4 absolute top-1/2 -translate-y-1/2 bg-[#FF5620]'
        />
      </div>
    </div>
  );
};

export default TimeLine;
