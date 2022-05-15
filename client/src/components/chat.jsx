import { Center, Container, Button, ScrollArea, Drawer, Group } from '@mantine/core';
import { useEffect, useState} from 'react'
// Socket Connection
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

const Chat = () => {

  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);
  const [messageList, setList] = useState([{ userLS: "Dustin", message: "Hello" },  {userLS: "Iaan", message: "Hello Dustin" }]);

  const userLS = localStorage.getItem("name");
  const sendMessage= () => {
    socket.emit('sendMessage', { message, userLS })
  }
  
   useEffect(() => {
    socket.on("receiveMessage", (data) =>{
      setList((prev) => {
        return [ ...prev, data ];
      })
    })
   }, [setList]);
  const messageListMapped = messageList.map((item, index) => {
    if(item.userLS === userLS){
       return <p key={ index + 1 } align="right">{ item.userLS }: { item.message }</p>
    }
  return <p key={ index + 1 } align="left">{ item.userLS }: { item.message }</p>
})

  return (
   


<>
      <Drawer
        opened={opened}  onClose={() => setOpened(false)}
        title="Register"
        padding="xl"
        size="xl"
        position="right"s
      >
        <Container>
      <Center>
        Chat...
      </Center>
      <ScrollArea style={{ height: 250 }}>
        { messageListMapped }
      </ScrollArea>
      <input placeholder='Message...' onChange={ (event) => setMessage(event.target.value)}/>
      <Button onClick={ sendMessage } color="indigo" radius="md" size="xs" compact>Send</Button>
    </Container> 


      </Drawer>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Chat</Button>
      </Group>
    </>
  )

}
export default Chat;


        
