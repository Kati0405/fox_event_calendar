import { Day as DayComponent } from '../Day/Day';
import { Day as DayType } from '../../types/types';
import { TimeSlotsColumn } from '../TimeSlotsColumn/TimeSlotsColumn';

export type Week = DayType[];

interface WeekProps {
  week: Week;
}

export const Week: React.FC<WeekProps> = ({ week }) => {
  return (
    <div className='w-2/3 flex'>
      <TimeSlotsColumn />
      <div className='grid grid-cols-7 bg-white shadow-sm w-full'>
        {week.map((day, idx) => (
          <DayComponent key={idx} date={day.date} />
        ))}
      </div>
    </div>
  );
};
