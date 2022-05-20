import {
    Button,
    Popover,
    ActionIcon,
    useMantineTheme,
    Space,
    Grid,
  } from '@mantine/core';
  import { Clock } from 'tabler-icons-react';
  import { CheckIcon } from '@modulz/radix-icons';
  import { showNotification } from '@mantine/notifications';
import React, { useEffect, useState, useContext } from "react";
import { colourListContext } from '../../providers/colourSchemeProvider';

export default function Pomodoro() {

  const { colorScheme, setColorScheme } = useContext(colourListContext);
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
    const dark = colorScheme === 'dark';

  const workSeconds = 1500;
  const breakSeconds = 300;


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
    setTimeout(() => {
            showNotification({
              id: 'load-data',
              color: 'teal',
              title: 'Your Pomodoro is started!',
              message: 'Time to make the magic happen!',
              icon: <CheckIcon />,
              autoClose: 3000,
            });
  })
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
  const convertWorkTimeToISO = new Date(workSecondsLeft * 1000).toISOString().slice(14, 19); 
  const convertBreakTimeToISO = new Date(breakSecondsLeft * 1000).toISOString().slice(14, 19); 

  return (
    <>
  
 <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position='bottom'
        placement='end'
        withCloseButton
        title='Pomodoro Timer'
        transition='pop-top-right'
        target={
          <ActionIcon
            variant='outline'
            color={dark ? 'yellow' : 'blue'}
            onClick={() => setOpened(o => !o)}>
            <Clock size='xl' />
          </ActionIcon>
        }>
 

 
      <div>Work: {convertWorkTimeToISO}</div>
      <div>Break: {convertBreakTimeToISO}</div>
      <Space m="sm"/>
      <Grid>
      <Button
       variant='outline'
                 color='teal'
                 compact
                 style={{ margin: 5 }}
      onClick={startWork}>start work</Button>
      <Button    variant='outline'
          color='red'
          compact
          style={{ margin: 5 }} onClick={resetWorkAndBreak}>reset</Button>

      </Grid>
      </Popover>
    </>
  );

};