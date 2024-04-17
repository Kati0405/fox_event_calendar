import { useMemo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import Button from './Button/Button';
import useTimer from '../../hooks/useTimer';

const Timer = () => {
  const { isActive, time, renderCount, startTimer, pauseTimer, resetTimer } =
    useTimer();

  const formatTime = useMemo(() => {
    return (timeInSeconds: number) => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    };
  }, []);

  return (
    <div className='mt-16 flex flex-col items-center gap-9'>
      <h1 className='text-6xl font-medium'>{formatTime(time)}</h1>
      <p>Number of component renders: {renderCount}</p>
      <div className='flex flex-col gap-2'>
        {isActive ? (
          <>
            <Button
              icon={<FontAwesomeIcon icon={faPause} />}
              name={'Pause'}
              colorClass={'bg-blue-500'}
              onClick={pauseTimer}
            />
            <Button
              name={'Reset'}
              colorClass={'bg-orange-500'}
              onClick={resetTimer}
            />
          </>
        ) : (
          <Button
            icon={<FontAwesomeIcon icon={faPlay} />}
            name={'Play'}
            colorClass={'bg-green-600'}
            onClick={startTimer}
          />
        )}
      </div>
    </div>
  );
};

export default Timer;
