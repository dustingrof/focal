import {
  Space,
  List,
  ScrollArea,
  Drawer,
  TextInput,
  ActionIcon,
  createStyles,
  useMantineTheme,
  Avatar,
  Tooltip,
  Badge,
  Grid
} from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { useHover } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { UserCircle, MessageCircle2 } from 'tabler-icons-react';
import { BrandHipchat } from 'tabler-icons-react';
import React, { useEffect, useState, useContext } from 'react';

// Socket Connection
import io from 'socket.io-client';
import { colourListContext } from '../../providers/colourSchemeProvider';
const socket = io.connect('http://localhost:3322');

//CSS
const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
    padding: theme.spacing.xl,
    borderRadius: theme.radius.xl,

    // reference button with nested selector
    [`&:hover .${getRef('button')}`]: {
      backgroundColor: theme.colors.violet[6],
    },
  },
}));

const Chat = () => {

  // Set State
  const { classes } = useStyles();
  const [message, setMessage] = useState('');
  const [opened, setOpened] = useState(false);
 
  const [messageList, setList] = useState([
    { userLS: 'Dustin', message: 'Hello' },
    { userLS: 'Iaan', message: 'Hello Dustin' },
  ]);
 
  // Gets user name from local storage for sendMessage function
  const userLS = localStorage.getItem('name');
  const user_ls_avatar = localStorage.getItem('avatar');
  
  // Style functionality
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  
  // Handles chat input
  const inputHandler = e => {
    setMessage(e.target.value);
  };

  // On enter sends message and user to server
  const enterHandler = e => {
    if (e.key === 'Enter' && e.target.value !== '') {
      socket.emit('sendMessage', { message, userLS, user_ls_avatar });
      setMessage('');
    }
  };

  // Gets all messages from sever
  useEffect(() => {
    socket.on('allMessages', data => {
      const updatedmessages = data.allMessages;
      setList(updatedmessages);
    });
  });

  // Sends notification when message is received from another user
  useEffect(() => {
    socket.on('notification', data => {
      if (data.userLS !== localStorage.getItem('name')) {
        showNotification({
          title: 'Message notification',
          message: `Hey there, ${data.userLS} just sent a message! `,
          icon: <MessageCircle2  size={20}/>
        });
      }
    });
  },[]);

  // Maps through messages and checks if the current user in local storage matches message user and changes message colour in list.
  const messageListMapped = messageList.map((item, index) => {
    return (
      <React.Fragment>
        {hovered ? (
          <Tooltip label={item.userls} color='blue' position='left' opened>
            <List.Item
              key={uuidv4()}
              icon={
                <Avatar
                  width='20'
                  height='20'
                  radius='xl'
                  src={item.user_ls_avatar ? item.user_ls_avatar : UserCircle}
                  ref={ref}
                />
              }>
              <Badge
                align='right'
                fullWidth
                color={item.userls === userLS ? 'blue' : 'indigo'}>
                {item.message}
              </Badge>
            </List.Item>
          </Tooltip>
        ) : (
          <Tooltip label={item.userls} color='blue' position='left'>
            <List.Item
              key={uuidv4()}
              icon={
                <Avatar
                  width='20'
                  height='20'
                  radius='xl'
                  src={item.user_ls_avatar ? item.user_ls_avatar : UserCircle}
                  ref={ref}
                />
              }>
              <Badge
                align='right'
                fullWidth
                color={item.userls === userLS ? 'blue' : 'indigo'}>
                {item.message}
              </Badge>
            </List.Item>
          </Tooltip>
        )}
        <Space h='sm' />
      </React.Fragment>
    );
  });

  const { colorScheme, setColorScheme } = useContext(colourListContext);
  const dark = colorScheme === 'dark';

  
  return (
    <React.Fragment>
      <Drawer
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
        padding='lg'
        size="18%"
        position='right'
        transition='pop'
        transitionDuration={200}
        transitionTimingFunction='ease'
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[1]
            : theme.colors.dark[10]
        }
        overlayOpacity={0.5}
        overlayBlur={3}
        >
        


        <ScrollArea className={classes.container} style={{ height: "auto", minHeight: '90%' }} >
        
          <List spacing='xs' size='sm' center key={'432'}>
            {messageListMapped}
          </List>
        </ScrollArea>
        <Space h='lg' />
         

        <TextInput
          id='chat-message-input'
          placeholder='Hit enter to send your message...'
          radius='lg'
          onChange={inputHandler}
          onKeyUp={enterHandler}
          justify='flex-end'
          value={message}
          multiline={true}
          autoComplete='off'
          />
       
      </Drawer>

      <ActionIcon
        variant='outline'
        color={dark ? '#4dabf7' : 'blue'}
        title='Open Chat'
        size={40}
        onClick={() => setOpened(o => !o)}>
        <BrandHipchat size={40} />
      </ActionIcon>
    </React.Fragment>
  );
};
export default Chat;
