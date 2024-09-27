import React from 'react';
import { Day as DayComponent, Day as DayType } from '../Day/Day';

export type Month = DayType[];

interface MonthProps {
  month: DayType[][];
}

export const Month: React.FC<MonthProps> = ({ month }) => {
  return (
    <div className='w-2/3'>
      <div className='flex-1 grid grid-cols-7 grid-rows-5 bg-white rounded-md'>
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <DayComponent key={idx} date={day.date} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
