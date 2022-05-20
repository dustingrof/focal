import React, { useContext,  useState } from "react";
import { Button, Center, Container, SimpleGrid, Modal, Group } from '@mantine/core';
import { timerContext } from "../../providers/timerProvider";

const Timer = () => {
  const { sec, min, hrs, timerActive, reset, start, stop } = useContext(timerContext)

  // Set state for timer
  const [opened, setOpened] = useState(false);
  
  //Timer component
  return (
    <>
    <Modal
    opened={opened}
    onClose={() => setOpened(false)}>
    < Container size={ 100 } px={ 0 } >
      <Center>{ hrs < 10 ? "0" + hrs : hrs} : { min < 10 ? "0" + min : min} : { sec < 10 ? "0" + sec : sec }</Center>
      <SimpleGrid cols={1} spacing="xs">
        <Button onClick = { timerActive? stop : start } color="indigo" radius="md" size="xs" compact>{ timerActive ? "Stop" : "Start"}</Button>
        <Button onClick = { reset } color="indigo" radius="md" size="xs" compact>Reset</Button>
      </SimpleGrid>
    </Container>
    </Modal>
    <Group position="center">
        <Button onClick={() => setOpened(true)}>Timer</Button>
      </Group>
      </>
  )
};

export default Timer;