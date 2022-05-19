import {
  Space,
  List,
  ListItem,
  ScrollArea,
  Drawer,
  Group,
  TextInput,
  ActionIcon,
  ThemeIcon,
  createStyles,
  useMantineTheme
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { UserCircle } from 'tabler-icons-react';
import { BrandHipchat } from 'tabler-icons-react';
import { useEffect, useState, useContext, useRef } from 'react';

// Socket Connection
import io from 'socket.io-client';
import { colourListContext } from '../../providers/colourSchemeProvider';
const socket = io.connect('http://localhost:3322');


//CSS


const useStyles = createStyles((theme, _params, getRef) => ({

  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
    padding: theme.spacing.xl,
    borderRadius: theme.radius.xl,

    // reference button with nested selector
    [`&:hover .${getRef('button')}`]: {
      backgroundColor: theme.colors.violet[6],
    },
  },
}));


const Chat = () => {
  const { classes } = useStyles();
  const [message, setMessage] = useState('');
  const [opened, setOpened] = useState(false);
  const [messageList, setList] = useState([
    { userLS: 'Dustin', message: 'Hello' },
    { userLS: 'Iaan', message: 'Hello Dustin' },
  ]);
  const theme = useMantineTheme();
  // Gets user name from local storage for sendMessage function
  const userLS = localStorage.getItem('name');

  // Handles input
  const inputHandler = e => {
    setMessage(e.target.value);
  };

  // On enter sends message and user to server
  const enterHandler = e => {
    if (e.key === 'Enter' && e.target.value !== "") {
      socket.emit('sendMessage', { message, userLS });
      setMessage('');
    }
  };

  //get all messages
  useEffect(() => {
    socket.on("allMessages", data => {
     
      const updatedmessages = data.allMessages
      setList(updatedmessages)
    })
  })



  // When message is received from server updates message list with new message
  // useEffect(() => {
  //   socket.on('receiveMessage', data => {
  //       setList(prev => {
  //       return [...prev, data];
  //     });
  //   });
  // }, []);

useEffect(() => {
  socket.on("notification",  (data) => {
    if(data.userLS !== userLS ){
      showNotification({title: 'Message notification', message: `Hey there, ${data.userLS} just sent a message! ` }); }
  });
}, [userLS])


  // Maps through messages and checks if the current user in local storage matches message user and aligns message in list.
  const messageListMapped = messageList.map((item, index) => {
  
    if (item.userls === userLS) {
      return (
        <>
          <ListItem key={index + 1} align='right'
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <UserCircle size={16} />
              </ThemeIcon>
            }>
            {item.userls}: {item.message}
          </ListItem>
          <Space h="sm" />
        </>
      );
    }
    return (
      <>
        <ListItem key={index + 1} align='left'
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <UserCircle size={16} />
            </ThemeIcon>
          }


        >
          {item.userls}: {item.message}
        </ListItem >
        <Space h="sm" />
      </>
    );
  });

  // const openChat = function() {
  //   const nothing = (() => setOpened(o => !o));
  //   nothing();
  //   scrollToBottom();

  // }


  // const viewport = useRef(".mantine-ScrollArea-root");
  // const viewport = useRef();

  // const scrollToBottom = () =>
  //   viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });

  const { colorScheme, setColorScheme } = useContext(colourListContext);
  const dark = colorScheme === 'dark';
  return (
    <>
      <Drawer
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
        padding='xl'
        size='md'
        position='right'
        transition='pop'
        transitionDuration={200}
        transitionTimingFunction='ease'
        overlayOpacity={0.55}
        overlayBlur={3}
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        >

        <ScrollArea
          className={classes.container} style={{ height: 850 }}>
          {/* viewportRef={viewport} */}
          <List
            spacing="xs"
            size="sm"
            center
          >
            {messageListMapped}
          </List>
        </ScrollArea>

        {/* <Grid.Col span={ 2 } > */}
        <Space h="lg" />
        <TextInput
          id='chat-message-input'
          placeholder='Hit enter to send your message...'
          radius='lg'
          onChange={inputHandler}
          onKeyUp={enterHandler}
          justify="flex-end"
          value={message}
          multiline={true}
          autoComplete='off'
        />

      </Drawer>
      <Group position='center'>
        <ActionIcon
          variant='outline'
          color={dark ? 'yellow' : 'blue'}
          title='Open Chat'
          onClick={() => setOpened(o => !o)}>
          <BrandHipchat size='xl' />
        </ActionIcon>
      </Group>
    </>
  );
};
export default Chat;
