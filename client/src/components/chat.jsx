import { useEffect, useState} from 'react'
// Socket Connection
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");

function Chat() {

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage= () => {
    socket.emit('sendMessage', {message})
  }
  
  useEffect(() => {
    socket.on("receiveMessage", (data) =>{
      setMessageReceived(data.message);
    })
  }, [socket]);


}


        
