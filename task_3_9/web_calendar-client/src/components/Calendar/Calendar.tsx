import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Context } from '../../context/context';
import { getMonth } from '../../utils/utils';

import { Day as DayType } from '../../types/types';

export default function Calendar() {
  const { currentMonth, setCurrentMonth } = useContext(Context)!;
  const [currentMonthData, setCurrentMonthData] = useState<DayType[][]>(
    getMonth(currentMonth)
  );

  useEffect(() => {
    setCurrentMonthData(getMonth(currentMonth));
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev + 1);
  };

  const isCurrentMonth = (date: Date) => {
    return dayjs(date).month() === currentMonth;
  };

  const isToday = (date: Date) => {
    return dayjs(date).isSame(dayjs(), 'day');
  };

  return (
    <div className='mt-4 bg-white rounded-lg p-2 shadow-md'>
      <div className='flex justify-between mb-2'>
        <p className='text-black font-bold'>
          {dayjs(new Date(dayjs().year(), currentMonth)).format('MMMM YYYY')}
        </p>
        <div className='flex gap-4'>
          <button onClick={handlePrevMonth}>
            <FaChevronLeft />
          </button>
          <button onClick={handleNextMonth}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className='grid grid-cols-7 grid-rows-6'>
        {currentMonthData[0].map((day, i) => (
          <span key={i} className='text-sm py-1 text-center font-bold'>
            {dayjs(day.date).format('dd')}
          </span>
        ))}
        {currentMonthData.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                className={`py-1 w-full rounded-lg ${
                  isToday(day.date)
                    ? 'bg-[#00AE1C] text-white'
                    : isCurrentMonth(day.date)
                    ? 'text-black'
                    : 'text-gray-400'
                }`}
              >
                <span className='text-sm'>{dayjs(day.date).format('D')}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
