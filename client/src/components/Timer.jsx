import React, { useEffect, useState } from "react";
import { Button, Center, Container, SimpleGrid } from '@mantine/core';

const Timer = () => {

  // Set state for timer
  const [ sec, setSec ] = useState(0);
  const [ min, setMin ] = useState(0);
  const [ hrs, setHrs ] = useState(0);
  const [ timerActive, setTimerActive ] = useState();

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
    setTimerActive(true)
  };
  
  //Use state to stop timer
  const stop = () => {
    setTimerActive(false)
  };

  // Use state to reset timer
  const reset = () => {
    setSec(0);
    setMin(0);
  };

  //Add time to card
  const addTimeToTask = () => {
    // users_tasks by id
    // user_task timer += just mins
  };



  //Timer component
  return (
    < Container size={ 100 } px={ 0 } >
      <Center>Timer</Center>
      <Center>{ hrs < 10 ? "0" + hrs : hrs} : { min < 10 ? "0" + min : min} : { sec < 10 ? "0" + sec : sec }</Center>
      <SimpleGrid cols={1} spacing="xs">
        <Button onClick = { timerActive? stop : start } color="indigo" radius="md" size="xs" compact>{ timerActive ? "Stop" : "Start"}</Button>
        <Button onClick = { reset } color="indigo" radius="md" size="xs" compact>Reset</Button>
        <Button onClick = { addTimeToTask } color="indigo" radius="md" size="xs" compact >Add to Task</Button>
      </SimpleGrid>
    </Container>
  )
}

export default Timer;