import React, { useContext,  useState } from "react";
import { Button, Center, Container, SimpleGrid, Popover, ActionIcon, Group, useMantineTheme } from '@mantine/core';
import { timerContext } from "../../providers/timerProvider";
import { Clock } from 'tabler-icons-react';
import { colourListContext } from '../../providers/colourSchemeProvider';

const Timer = () => {
  const { colorScheme, setColorScheme } = useContext(colourListContext);
    const [opened, setOpened] = useState(false);
    const theme = useMantineTheme();
    const dark = colorScheme === 'dark';






  const { sec, min, hrs, timerActive, reset, start, stop } = useContext(timerContext)


  //Timer component
  return (
    <>
    <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position='bottom'
        placement='end'
        withCloseButton
        title='Task Timer'
        transition='pop-top-right'
        target={
          <ActionIcon
            variant='outline'
            color={dark ? 'yellow' : 'blue'}
            onClick={() => setOpened(o => !o)}>
            <Clock size='xl' />
          </ActionIcon>
        }>
    < Container size={ 100 } px={ 0 } >
      <Center>{ hrs < 10 ? "0" + hrs : hrs} : { min < 10 ? "0" + min : min} : { sec < 10 ? "0" + sec : sec }</Center>
      <SimpleGrid cols={1} spacing="xs">
        <Button onClick = { timerActive? stop : start } color="indigo" radius="md" size="xs" compact>{ timerActive ? "Stop" : "Start"}</Button>
        <Button onClick = { reset } color="indigo" radius="md" size="xs" compact>Reset</Button>
      </SimpleGrid>
    </Container>
    </Popover>
  
      </>
  )
};

export default Timer;