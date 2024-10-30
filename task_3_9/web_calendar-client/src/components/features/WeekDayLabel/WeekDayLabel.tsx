import dayjs from 'dayjs';

import { Day as DayType } from 'src/types/types';
import AllDayEvent from 'src/components/features/AllDayEvent';

const WeekDayLabel: React.FC<DayType> = ({ date }) => {
  const formattedDate = dayjs(date).format('YYYY-MM-DD');
  const [day, dayOfWeek] = dayjs(date).format('DD ddd').split(' ');
  const today = dayjs().format('YYYY-MM-DD');
  const isToday = today === formattedDate;

  return (
    <div className='flex flex-col flex-1 border-l p-1 border-b'>
      <div
        className={`w-36 flex flex-col items-center p-2  ${
          isToday ? 'bg-green-100 rounded-md' : ''
        }`}
      >
        <span className='text-lg font-bold'>{day}</span>
        <span className='text-sm'>{dayOfWeek.toUpperCase()}</span>
      </div>
      <AllDayEvent formattedDate={formattedDate} />
    </div>
  );
};
export default WeekDayLabel;
