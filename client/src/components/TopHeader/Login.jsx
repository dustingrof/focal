import { useState, useContext } from 'react';
import {
  Button,
  Select,
  Group,
  Center,
  Popover,
  ActionIcon,
  useMantineTheme,
  Space,
} from '@mantine/core';
import { User } from 'tabler-icons-react';
import { colourListContext } from '../../providers/colourSchemeProvider';
import { boardContext } from '../../providers/boardProvider';

const Login = () => {
  const [user, setUser] = useState();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { onUserAvatar } = useContext(boardContext);

  const userChange = function () {

    const userSetting = event => {
      setUser(event);
      onUserAvatar(event);
    }
    
    userSetting();

  };




  // Sets user from <Select> dropdown to local storage
  const addUserToLocalState = () => {
    localStorage.setItem('name', user);
  };

  // Removes current user from local storage
  const removeUserFromLocalState = () => {
    localStorage.removeItem('name');
  };
  const { colorScheme, setColorScheme } = useContext(colourListContext);
  const dark = colorScheme === 'dark';
  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position='bottom'
      placement='end'
      withCloseButton
      title='Change user'
      transition='pop-top-right'
      target={
        <ActionIcon
          variant='outline'
          color={dark ? 'yellow' : 'blue'}
          onClick={() => setOpened(o => !o)}>
          <User size='xl' />
        </ActionIcon>
      }>
      <Group position='center' spacing='sm'>
        <Select
          placeholder='Login as ...'
          onChange={userChange}
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
