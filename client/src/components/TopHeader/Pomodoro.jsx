import {
  Divider,
  SimpleGrid,
  Button,
  Popover,
  ActionIcon,
  useMantineTheme,
  Space,
  Accordion,
  Center,
  Group,
  Text,
} from '@mantine/core';
import { Clock } from 'tabler-icons-react';
import { CheckIcon } from '@modulz/radix-icons';
import { showNotification } from '@mantine/notifications';
import React, { useEffect, useState, useContext } from 'react';
import { colourListContext } from '../../providers/colourSchemeProvider';
import TimerDisplay from './TimerDisplay';
import { timerContext } from '../../providers/timerProvider';
export default function Pomodoro() {
  const { colorScheme, setColorScheme } = useContext(colourListContext);
  const { timerActive, sec, min, hrs } = useContext(timerContext);
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
      setWorkSecondsLeft(workSecondsLeft => workSecondsLeft - 1);
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
    });
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
  };

  // this hook stops break countdown at 0 and resets
  useEffect(() => {
    if (breakSecondsLeft === 0) {
      clearInterval(breakTimer);
      resetWorkAndBreak();
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
  const convertWorkTimeToISO = new Date(workSecondsLeft * 1000)
    .toISOString()
    .slice(14, 19);
  const convertBreakTimeToISO = new Date(breakSecondsLeft * 1000)
    .toISOString()
    .slice(15, 19);
  // const timeDisplay = ({hrs < 10 ? "0" + hrs : hrs} : { min < 10 ? "0" + min : min} : { sec < 10 ? "0" + sec : sec });

  const miniTimeDisplay = function () {
    if (timerActive) {
      return `${hrs < 10 ? '0' + hrs : hrs} :  ${
        min < 10 ? '0' + min : min
      } :  ${sec < 10 ? '0' + sec : sec} `;
    }
    return 'Please start a timer';
  };
  return (
    <>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position='bottom'
        placement='end'
        // withclosebutton='false'
        transition='pop-top-right'
        target={
          <ActionIcon
            size={40}
            variant='outline'
            color={dark ? '#4dabf7s' : 'blue'}
            onClick={() => setOpened(o => !o)}>
            <Clock size={40} />
          </ActionIcon>
        }>
        <Accordion iconPosition='right' offsetIcon={false} multiple>
          {/* <Accordion.Item label='Pomodoro Timer'> */}
          <Accordion.Item
            label={
              <Group noWrap>
                <div>
                  <Text>Pomodoro Timer</Text>
                  <Text size='sm' color='dimmed' weight={400}>
                    {convertWorkTimeToISO
                      ? convertWorkTimeToISO
                      : 'Please start a timer'}
                  </Text>
                </div>
              </Group>
            }>
            <Center>Work: {convertWorkTimeToISO}</Center>
            <Center>Break: {convertBreakTimeToISO}</Center>
            <Space m='sm' />
            <SimpleGrid cols={1} spacing='xs'>
              <Button
                onClick={startWork}
                // color='cyan'
                radius='md'
                size='xs'
                variant='outline'
                compact>
                Start Work
              </Button>
              <Button
                onClick={resetWorkAndBreak}
                color='red'
                radius='md'
                size='xs'
                variant='outline'
                compact>
                Reset
              </Button>
            </SimpleGrid>
          </Accordion.Item>
          <Divider my='sm' />
          {/* <Accordion.Item label='Task Timer'> */}
          <Accordion.Item
            label={
              <Group noWrap>
                <div>
                  <Text>Task Timer</Text>
                  <Text size='sm' color='dimmed' weight={400}>
                    {miniTimeDisplay()}
                  </Text>
                </div>
              </Group>
            }>
            <Center>Task Timer</Center>
            <TimerDisplay />
          </Accordion.Item>
        </Accordion>
      </Popover>
    </>
  );
}
