import { useState, useContext } from 'react';
import {
  Button,
  Select,
  Group,
  Popover,
  ActionIcon,
  useMantineTheme,
  Avatar
} from '@mantine/core';
import { User } from 'tabler-icons-react';
import { colourListContext } from '../../providers/colourSchemeProvider';
import { headerContext } from '../../providers/headerProvider';

const Login = () => {
  const { user, setUser, currentAvatar, setCurrentAvatar } = useContext( headerContext );
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { colorScheme } = useContext(colourListContext);
  const dark = colorScheme === 'dark';
  
  // Sets user from <Select> dropdown to local storage
  const addUserToLocalState = () => {
    localStorage.setItem('name', user);
    setUser(localStorage.getItem('name'))

    // add userAvater to local storage
    let avatar;

    switch (user) {
      case "Dustin":
        avatar = "https://media-exp1.licdn.com/dms/image/C5603AQG9TyKFm-53iw/profile-displayphoto-shrink_800_800/0/1646679014931?e=1658361600&v=beta&t=RwhvswjhtXKHoO_UIjWTi84w2qmp6zBFNai3HVmU8Bw";
        break;
      case "Nicole":
        avatar = "https://media-exp1.licdn.com/dms/image/C5603AQEUSRGk43oeGA/profile-displayphoto-shrink_800_800/0/1652991046562?e=1658361600&v=beta&t=ORJ1H2_Qk_V8_xJe3w6ia0mfAYo4mdg8TxLaWuRrt5g";
        break;
      case "Iaan":
        avatar = "https://media-exp1.licdn.com/dms/image/C5603AQHwuNX81FzwEQ/profile-displayphoto-shrink_400_400/0/1646859896622?e=1658361600&v=beta&t=nioiZ7kph-nU2N1P97Y7xTeZXJl9OAqUSi0esu6SMu0";
        break;
      default:
        avatar = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2zIMQkX0ve8QO5B5Hk8TC8&ust=1653112270774000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMDktJ-x7fcCFQAAAAAdAAAAABAD";
    }

    localStorage.setItem('avatar', avatar);
    const localUserSet = () => {
      setCurrentAvatar(avatar);
    };
    localUserSet();
     setOpened(false);
  };

  // Removes current user from local storage
  const removeUserFromLocalState = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');
    setUser();
    setOpened(false);
  };
 
  
  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position='bottom'
      placement='end'
      withCloseButton
      title='Change user'
      transition='pop-top-right'
      // target={ popoverTarget }
      target =
      {!user ? 
        (<ActionIcon
        variant='outline'
        color={dark ? '#4dabf7' : 'blue'}
        onClick={() => setOpened(o => !o)}>
        <User size='xl' />
      </ActionIcon>) : 
      (
      <ActionIcon>
        <Avatar
        radius="sm"
        size={28}
        src={currentAvatar}
        onClick={() => setOpened(o => !o)}
        /> 
        </ActionIcon>)}
      

      >
      <Group position='center' spacing='sm'>
        <Select
          placeholder='Login as ...'
          onChange={event => { setUser(event)}}

          size='xs'
          data={[
            { value: 'Dustin', label: 'Dustin' },
            { value: 'Iaan', label: 'Iaan' },
            { value: 'Nicole', label: 'Nicole' },
          ]}
        />
      </Group>

      <Button
        compact
        className='login-btn'
        onClick={addUserToLocalState}
        style={{ marginTop: 10, marginRight: 10 }}>
        Login { }
      </Button>
      <Button compact className='logout-btn' onClick={removeUserFromLocalState}>
        Logout
      </Button>
    </Popover>
  );
};

export default Login;
