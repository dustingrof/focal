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
} from '@mantine/core';
import { Sun, MoonStars, Files } from 'tabler-icons-react';
import Chat from './Chat';
import Login from './Login';
import { colourListContext } from '../../providers/colourSchemeProvider';
import NewTaskCardFocus from './NewTaskCardFocus';

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
            align='center'
            variant='gradient'
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            // size={'xl'}
            weight={700}
            style={{ fontFamily: 'Greycliff CF, sans-serif', fontSize: 28 }}>
            <a href='/'>focal</a>
          </Text>
        </Grid.Col>
        <Grid.Col span={1} offset={6}></Grid.Col>
        <Grid.Col span={2} style={iconSpacing}>

          <NewTaskCardFocus />

          <Login />

          <ActionIcon
            variant='outline'
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title='Toggle color scheme'>
            {dark ? <Sun size={18} /> : <MoonStars size={18} />}
          </ActionIcon>
          <Chat 
          
          />
        </Grid.Col>
      </Grid>
    </Header>
  );
}
