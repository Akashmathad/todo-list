'use client';
import React, { FC, useEffect, useState } from 'react';

interface TimerProps {
  time: number;
  completed: boolean;
}

const Timer: FC<TimerProps> = ({ time, completed }) => {
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addLeadingZero = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  const days = Math.floor(timer / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timer % (1000 * 60)) / 1000);

  if (completed || timer <= 0) return <span>0</span>;

  return (
    <span>
      {days}d:{hours}h:{addLeadingZero(minutes)}
      m:{addLeadingZero(seconds)}s{' '}
    </span>
  );
};

export default Timer;
