import { useState, useRef, useEffect } from 'react';

const useTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  const intervalRef = useRef<number>(0);

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, []);

  const startTimer = () => {
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };
  const pauseTimer = () => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    pauseTimer();
    setTime(0);
  };

  return {
    isActive,
    time,
    renderCount,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};

export default useTimer;
