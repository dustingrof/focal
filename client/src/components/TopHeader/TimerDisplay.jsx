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
    < Container size={ 100 } px={ 0 } >
      <Center>{ hrs < 10 ? "0" + hrs : hrs} : { min < 10 ? "0" + min : min} : { sec < 10 ? "0" + sec : sec }</Center>
      <SimpleGrid cols={1} spacing="xs">
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
      </SimpleGrid>
    </Container>  
      </>
  )
};

export default Timer;