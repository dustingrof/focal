import { Container, Button, ScrollArea, Drawer, Group, Input } from '@mantine/core';
import { useEffect, useState } from 'react';
// Socket Connection
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3322");

const Chat = () => {

  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);
  const [messageList, setList] = useState([{ userLS: "Dustin", message: "Hello" }, { userLS: "Iaan", message: "Hello Dustin" }]);

  // Gets user name from local storage for sendMessage function
  const userLS = localStorage.getItem("name");

  // On click sends message and user to server
  const sendMessage = () => {
    socket.emit('sendMessage', { message, userLS });
  };

  // When message is received from server updates message list with new message
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setList((prev) => {
        return [...prev, data];
      });
    });
  }, [setList]);

  // Maps through messages and checks if the current user in local storage matches message user and aligns message in list.
  const messageListMapped = messageList.map((item, index) => {
    if (item.userLS === userLS) {
      return <p key={index + 1} align="right">{item.userLS}: {item.message}</p>;
    }
    return <p key={index + 1} align="left">{item.userLS}: {item.message}</p>;
  });

  return (
    <>
      <Drawer
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="xl"
        position="right" s
      >
        <Container>
          <ScrollArea style={{ height: 850 }}>
            {messageListMapped}
          </ScrollArea>
          {/* <Grid.Col span={ 2 } > */}
          <Input placeholder="Your message..." radius="lg" onChange={(e) => setMessage(e.target.value)} />
          <Button onClick={sendMessage} color="indigo" radius="md" size="xs" compact>Send</Button>
          {/* </Grid.Col> */}
        </Container>
      </Drawer>
      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Chat</Button>
      </Group>
    </>
  );

};
export default Chat;



