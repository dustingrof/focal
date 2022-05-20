import React, { useEffect, useState, useContext } from 'react';
import { showNotification } from '@mantine/notifications';
import {
  Button,
  Select,
  Group,
  Center,
  Popover,
  ActionIcon,
  useMantineTheme,
  NumberInput,
  Space,
} from '@mantine/core';
import { colourListContext } from '../../providers/colourSchemeProvider';
import { Clock } from 'tabler-icons-react';

export default function Pomodoro() {
  const { colorScheme, setColorScheme } = useContext(colourListContext);
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const dark = colorScheme === 'dark';

  //State
  const [timerPomodoroActive, setTimerPomodoroActive] = useState(false);

  const [workTimer, setWorkTimer] = useState();
  const [breakTimer, setBreakTimer] = useState();
  const [workSecondsLeft, setWorkSecondsLeft] = useState(3);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(1);

  // start work countdown timer function
  const startWork = () => {
    const startWorkTimer = setInterval(() => {
      setWorkSecondsLeft(workSecondsLeft => workSecondsLeft - 1);
    }, 1000);
    setWorkTimer(startWorkTimer);
    setTimerPomodoroActive(true);
  };

  // this hook stops countdown at 0 and starts next 'break' countdown
  useEffect(() => {
    if (workSecondsLeft === 0) {
      clearInterval(workTimer);
      startBreak();
      showNotification({
        title: 'Pomodoro notification',
        message: `Hey there, time for a break! `,
        autoClose: false,
      });
    }
  }, [workSecondsLeft, workTimer]);

  // this hook stops memory leak if start button pressed multiple times
  useEffect(() => {
    return () => clearInterval(workTimer);
  }, [workTimer]);

  // start break countdown timer function
  const startBreak = () => {
    const startBreakTimer = setInterval(() => {
      setBreakSecondsLeft(breakSecondsLeft => breakSecondsLeft - 1);
    }, 1000);
    setBreakTimer(startBreakTimer);
    setTimerPomodoroActive(true);
  };

  // this hook stops break countdown at 0 and resets
  useEffect(() => {
    if (breakSecondsLeft === 0) {
      clearInterval(breakTimer);
      resetWorkAndBreak();
      setTimerPomodoroActive(false);
    }
  }, [breakSecondsLeft, breakTimer]);

  // this hook stops memory leak if start button pressed multiple times
  useEffect(() => {
    return () => clearInterval(breakTimer);
  }, [breakTimer]);

  const resetWorkAndBreak = () => {
    setWorkSecondsLeft(workTimer);
    setBreakSecondsLeft(breakTimer);
    setTimerPomodoroActive(false);
  };

  return (
    <>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position='bottom'
        placement='end'
        withCloseButton
        title='Change user'
        transition='pop-top-right'
        target={
          <ActionIcon
            variant='outline'
            color={dark ? 'yellow' : 'blue'}
            onClick={() => setOpened(o => !o)}>
            <Clock size='xl' />
          </ActionIcon>
        }>
        {/* <div>Pomodoro</div> */}

        {/* <Button onClick = { timerActive? stop : start } color="indigo" radius="md" size="xs" compact>{ timerActive ? "Stop" : "Start"}</Button> */}
        {/*  */}
        <Button
          variant='outline'
          color='teal'
          compact
          onClick={!timerPomodoroActive ? startWork : resetWorkAndBreak}>
          {!timerPomodoroActive ? 'Start Timer' : 'Reset Timer'}
        </Button>
        {/* <Button
          variant='outline'
          color='red'
          compact
          style={{ margin: 5 }}
          onClick={resetWorkAndBreak}>
          Reset Timer
        </Button> */}
        <Space m='xl' />
        <div>
          Work Time: {timerPomodoroActive ? workSecondsLeft : workTimer}
        </div>
        <NumberInput
          defaultValue={45}
          size='xs'
          label='How long would you like to work?'
          // onChange={e => setWorkSecondsLeft(e.target.value)}
          // onChange={value}
          value={workTimer}
          onChange={val => setWorkTimer(val)}
        />
        <div>Break Time: {breakSecondsLeft}</div>
        <NumberInput
          defaultValue={10}
          size='xs'
          label='How long would you like your break?'
        />
      </Popover>
    </>
  );
}
