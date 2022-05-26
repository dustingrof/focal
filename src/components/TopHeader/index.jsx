import React, { useContext } from 'react';
import {
  Grid,
  Space,
  AppShell,
  Navbar,
  Header,
  Text,
  ActionIcon,
  MantineProvider,
  ColorSchemeProvider,
  Button,
  Badge,
} from '@mantine/core';
import { Sun, MoonStars, Files } from 'tabler-icons-react';
import Chat from './Chat';
import Login from './Login';
import Pomodoro from './Pomodoro';
import TimerDisplay from './TimerDisplay';
import { colourListContext } from '../../providers/colourSchemeProvider';

import NewBoardCardFocus from '../LeftNavbar/NewBoardCardFocus';
// import HeaderAvatar from './HeaderAvatar';

export default function TopHeader() {
  const { colorScheme, setColorScheme } = useContext(colourListContext);

  const dark = colorScheme === 'dark';
  const toggleColorScheme = ColorScheme =>
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  const iconSpacing = { display: 'flex', justifyContent: 'space-evenly' };

  return (
    <Header height={60} p='xs'>
      <Grid>
        <Grid.Col span={3}>
          <Text
            component='span'
            className='focal-logo'
            align='center'
            variant='gradient'
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            // size={'xl'}
            weight={700}
            style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: 32 }}>
            <a href='/'>focal</a>
          </Text>
          {/* <Badge variant='filled' size='xs' color='cyan'>
            beta
          </Badge> */}
        </Grid.Col>

        <Grid.Col span={9} className='header-icons'>
          <Pomodoro />
          <ActionIcon
            variant='transparent'
            size={40}
            color={dark ? '#4dabf7' : 'blue'}
            onClick={() => toggleColorScheme()}
            title='Toggle color scheme'>
            {dark ? (
              <Sun size={35} className='nav-buttons' />
            ) : (
              <MoonStars size={35} className='nav-buttons' />
            )}
          </ActionIcon>
          <Chat />
          <Login />
        </Grid.Col>
      </Grid>
    </Header>
  );
}
