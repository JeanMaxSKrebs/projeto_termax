// Timer.js
import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';

const Timer = ({ isActive, isPaused, initialTime = 0 }) => {
  const [elapsedTime, setElapsedTime] = useState(initialTime);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      // Clear the interval if the timer is not active or is paused
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return <Text>{formatTime(elapsedTime)}</Text>;
};

export default Timer;
