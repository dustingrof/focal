import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create a context
export const timerContext = createContext();

// Create a Component wrapper from Context.Provider
export default function TimerProvider(props) {
  const { taskid, taskName, time } = props;  
  // here is our shared state object
  const [ sec, setSec ] = useState(0);
  const [ min, setMin ] = useState(0);
  const [ hrs, setHrs ] = useState(0);
  const [ timerActive, setTimerActive ] = useState(false);


      // Increment timer in seconds
  useEffect (() => {
    let timer;
    if(timerActive){
      timer = setInterval(() => {
        setSec(sec + 1);

        if (sec === 59) {
          setMin(min + 1);
          setSec(0);
        }
        if (min === 59) {
          setHrs(hrs + 1);
          setMin(0);
        }
      }, 1000)
      return () => clearInterval(timer);

    }
  });
  

    // Use state to start timer
    const start = () => {
      setTimerActive(true);
    };
  //Use state to stop timer
  const stop = () => {
    setTimerActive(false)
  };

  // Use state to reset timer
  const reset = () => {
    setSec(0);
    setMin(0);
    setHrs(0);
  };
  


  const exportedValues = { sec, min, hrs, timerActive, setHrs, setMin, setSec, setTimerActive, reset, stop, start };

  return (
    <timerContext.Provider value={ exportedValues }>
      {props.children}
    </timerContext.Provider>
  );
}
export const useTimer = () => useContext(timerContext);