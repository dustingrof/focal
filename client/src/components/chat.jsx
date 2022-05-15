import { Center, Container, Button, ScrollArea } from '@mantine/core';
import { useEffect, useState} from 'react'
// Socket Connection
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

const Chat = () => {

  const [message, setMessage] = useState("");
  const [messageList, setList] = useState(["Hello", "Hello again"]);

  const sendMessage= () => {
    console.log("front-end...", message)
    socket.emit('sendMessage', { message })
  }
  
   useEffect(() => {
    socket.on("receiveMessage", (data) =>{
      setList((prev) => {
        return [...prev, data.message ]
      })
    })
   }, [setList]);

  const messageListMapped = messageList.map((mess, index) => <p key={ index + 1 }>{ mess }</p>)

  return (
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
  )

}
export default Chat;


        
