import {
  Space,
  List,
  ListItem,
  ScrollArea,
  Drawer,
  Group,
  Input,
  ActionIcon,
  ThemeIcon,
  createStyles
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { UserCircle } from 'tabler-icons-react';
import { BrandHipchat } from 'tabler-icons-react';
import { useEffect, useState, useContext } from 'react';

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

  // When message is received from server updates message list with new message
  useEffect(() => {
    socket.on('receiveMessage', data => {
     
      if(data.userLS !== userLS ){
        showNotification({title: 'Message notification', message: `Hey there, ${data.userLS} just sent a message! ` }); }

        setList(prev => {
        return [...prev, data];
      });
    });
  }, []);




  // Maps through messages and checks if the current user in local storage matches message user and aligns message in list.
  const messageListMapped = messageList.map((item, index) => {
    if (item.userLS === userLS) {
      return (
        <>
          <ListItem key={index + 1} align='right'
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <UserCircle size={16} />
              </ThemeIcon>
            }>
            {item.userLS}: {item.message}
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
          {item.userLS}: {item.message}
        </ListItem >
        <Space h="sm" />
      </>
    );
  });

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
        transition="slide-left"
        duration={400}
        timingFunction="ease">

        <ScrollArea
          className={classes.container} style={{ height: 850 }}>
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
        <Input
          id='chat-message-input'
          placeholder='Hit enter to send your message...'
          radius='lg'
          onChange={inputHandler}
          onKeyUp={enterHandler}
          justify="flex-end"
          value={message}
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
