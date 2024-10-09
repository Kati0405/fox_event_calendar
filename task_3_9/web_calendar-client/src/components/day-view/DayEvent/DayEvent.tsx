import { startOfDay, differenceInMinutes, format } from 'date-fns';
import { Event } from '../../../types/types';
import { useContext } from 'react';
import { Context } from '../../../context/context';

const minutes_in_day = 24 * 60;

interface DayEvent {
  day: Date;
  event: Event;
  index: number;
  grouplength: number;
  containerHeight: number;
}

export const DayEvent: React.FC<DayEvent> = ({
  day,
  event,
  index,
  grouplength,
  containerHeight,
}) => {
  const { selectedView } = useContext(Context)!;
  const today = startOfDay(day);
  const eventDuration = differenceInMinutes(event.end_date, event.start_date);

  const generateBoxStyle = () => {
    const minutesPassed = differenceInMinutes(event.start_date, today);

    const percentage = minutesPassed / minutes_in_day;
    const top = percentage * containerHeight;
    const height = (eventDuration / minutes_in_day) * containerHeight;

    const isLast = index === grouplength - 1;
    let widthPercentage = grouplength === 1 ? 1 : (1 / grouplength) * 1.7;

    if (isLast) {
      widthPercentage = 1 / grouplength;
    }

    const styles = {
      top,
      height,
      padding: '2px 8px',
      zIndex: 100 + index,
      width: `${
        selectedView === 'Day'
          ? `calc((100% - 96px) * ${widthPercentage})`
          : `100% * ${widthPercentage}`
      }`,
    };

    if (isLast) {
      return { ...styles, right: 0 };
    }

    return {
      ...styles,
      left:
        selectedView === 'Day'
          ? `calc(100px + 100% * ${(1 / grouplength) * index})`
          : `calc(100% * ${(1 / grouplength) * index})`,
    };
  };

  return (
    <div>
      <div
        style={generateBoxStyle()}
        className='bg-[#EEC04C4D] border border-white rounded cursor-pointer absolute'
      >
        <h1 className='text-xs'>
          {`${event.title}, 
            ${format(event.start_date, 'h:mm a')} - 
            ${format(event.end_date, 'h:mm a')}`}
        </h1>
      </div>
    </div>
  );
};
