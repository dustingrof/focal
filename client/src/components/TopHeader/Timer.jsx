import React, { useContext, useEffect } from "react";
import { Button, Center, Container, SimpleGrid, Group } from '@mantine/core';
import { timerContext } from "../../providers/timerProvider";

const Timer = (props) => {
  const { addTimeToTask } = props;
  const { sec, min, hrs, timerActive, setTimerActive, reset,  stop } = useContext(timerContext);

  // Use state to start timer
  const start = () => {
    setTimerActive(true);
  };

  //Timer component
  return (
    <>
    
      <Container size={ 100 } px={ 0 }  >
        <Center>{ hrs < 10 ? "0" + hrs : hrs}:{ min < 10 ? "0" + min : min}:{ sec < 10 ? "0" + sec : sec }</Center>
        <SimpleGrid cols={1} spacing="xs">
        <Button onClick = { timerActive? stop : start } color="indigo" radius="md" size="xs" compact>{ timerActive ? "Stop" : "Start"}</Button>
        <Button onClick = { reset } color="indigo" radius="md" size="xs" compact>Reset</Button>
        <Button onClick = { addTimeToTask } color="indigo" radius="md" size="sm" compact>Add to Task </Button>
      </SimpleGrid>
      </Container>
    </>
  )
};

export default Timer;