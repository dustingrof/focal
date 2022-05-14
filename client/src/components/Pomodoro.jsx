import React, { useEffect, useState } from "react";

export default function Pomodoro() {

  const workSeconds = 3;
  const breakSeconds = 2;


  const [workSecondsLeft, setWorkSecondsLeft] = useState(workSeconds);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(breakSeconds);
  const [workTimer, setWorkTimer] = useState();
  const [breakTimer, setBreakTimer] = useState();

  // start work countdown timer function
  const startWork = () => {
    const startWorkTimer = setInterval(() => {
      setWorkSecondsLeft((workSecondsLeft) => workSecondsLeft - 1);
    }, 1000);
    setWorkTimer(startWorkTimer);
  };
  
  // this hook stops countdown at 0 and starts next 'break' countdown
  useEffect(() => {
    if (workSecondsLeft === 0) {
      clearInterval(workTimer);
      startBreak();
    }
  }, [workSecondsLeft, workTimer]);
  
  // this hook stops memory leak if start button pressed multiple times
  useEffect(() => {
    return () => clearInterval(workTimer);
  }, [workTimer]);
  
  // start break countdown timer function
  const startBreak = () => {
    const startBreakTimer = setInterval(() => {
      setBreakSecondsLeft((breakSecondsLeft) => breakSecondsLeft - 1);
    }, 1000);
    setBreakTimer(startBreakTimer);
  }
  
  // this hook stops break countdown at 0 and resets
  useEffect(() => {
    if (breakSecondsLeft === 0) {
      clearInterval(breakTimer);
      resetWorkAndBreak()
    }
  }, [breakSecondsLeft, breakTimer]);
  
  // this hook stops memory leak if start button pressed multiple times
  useEffect(() => {
    return () => clearInterval(breakTimer);
  }, [breakTimer]);


  const resetWorkAndBreak = () => {
    setWorkSecondsLeft(workSeconds);
    setBreakSecondsLeft(breakSeconds);
  };


  return (
    <>
      <div>Pomodoro</div>
      <div>Work: {workSecondsLeft}</div>
      <div>Break: {breakSecondsLeft}</div>
      <button onClick={startWork}>start work</button>
      <button onClick={resetWorkAndBreak}>reset</button>
    </>
  );

};