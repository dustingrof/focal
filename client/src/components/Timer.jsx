import React, { useContext, useEffect } from 'react';
import { Button, Center, Container, SimpleGrid, Group } from '@mantine/core';
import { timerContext } from '../providers/timerProvider';

const Timer = props => {
  const { addTimeToTask } = props;
  const { sec, min, hrs, timerActive, setTimerActive, reset, stop } =
    useContext(timerContext);

  // Use state to start timer
  const start = () => {
    setTimerActive(true);
  };

  //Timer component
  return (
    <>
      <Container
        px={0}
        style={{ border: '1px solid lightgrey', padding: 10, borderRadius: 7 }}>
        <SimpleGrid cols={4}>
          <Center style={{fontWeight: 800}}>
            {hrs < 10 ? '0' + hrs : hrs}:{min < 10 ? '0' + min : min}:
            {sec < 10 ? '0' + sec : sec}
          </Center>
          <Button
            onClick={timerActive ? stop : start}
            // color='cyan'
            radius='md'
            size='xs'
            variant='outline'
            compact>
            {timerActive ? 'Stop' : 'Start'}
          </Button>
          <Button
            onClick={reset}
            color='red'
            radius='md'
            size='xs'
            variant='outline'
            compact>
            Reset
          </Button>
          <Button
            onClick={addTimeToTask}
            color='green'
            radius='md'
            size='xs'
            // variant='outline'
            compact>
            Add Time to Task
          </Button>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Timer;
