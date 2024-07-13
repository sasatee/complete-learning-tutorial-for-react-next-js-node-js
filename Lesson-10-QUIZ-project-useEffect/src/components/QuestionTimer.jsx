import React, { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeOut, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    // console.log("SETTING TIMEOUT");
    const Timer = setTimeout(onTimeOut, timeout);

    return () => {
      clearTimeout(Timer);
    };
  }, [timeout, onTimeOut]);

  useEffect(() => {
    // console.log("SETTING INTERVAL")
    const interval = setInterval(() => {
      setRemainingTime((prevReminingTime) => prevReminingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}
