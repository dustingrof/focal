import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  Logo,
  colorScheme,
  ActionIcon,
  toggleColorScheme,
  Button,
  MantineProvider,
  useMantineColorScheme,
  ColorSchemeProvider,
  Grid,
} from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

// import Pomodoro from './components/Pomodoro';
// import VideoChat from './components/VideoChat';
import Chat from './components/Chat';
import Login from './components/Login';
import TaskCardFocus from './components/TaskCardFocus';

const board = {
  columns: [
    {
      id: 1,
      title: 'Backlog',
      cards: [
        {
          id: 1,
          title: 'Add card',
          description: 'Add capability to add a card in a column',
        },
      ],
    },
    {
      id: 2,
      title: 'Doing',
      cards: [
        {
          id: 2,
          title: 'Drag-n-drop support',
          description: 'Move a card between the columns',
        },
      ],
    },
    {
      id: 3,
      title: 'Pending',
      cards: [
        {
          id: 3,
          title: 'Drag-n-drop support',
          description: 'Move a card between the columns',
        },
      ],
    },
    {
      id: 4,
      title: 'Complete',
      cards: [
        {
          id: 4,
          title: 'Drag-n-drop support',
          description: 'Move a card between the columns',
        },
      ],
    },
  ],
};

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const dark = colorScheme === 'dark';
  const toggleColorScheme = ColorScheme =>
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS>
        <AppShell
          padding='md'
          navbar={
            <Navbar width={{ base: 'auto' }} p='xs'>
              {/* Navbar content */}
              <Navbar.Section>{/* Header with logo */}header</Navbar.Section>
              <Navbar.Section grow mt='md'>
                {/* Links sections */}links
              </Navbar.Section>
              <Navbar.Section>footer{/* Footer with user */}</Navbar.Section>
            </Navbar>
          }
          header={
            <Header height={60} p='xs'>
              <Grid justify='space-between'>
                <Grid.Col span={3}>
                  <Text
                    component='span'
                    align='center'
                    variant='gradient'
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    size={'xl'}
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                    focal
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Login></Login>
                </Grid.Col>
                <Grid.Col span={1}>
                  <ActionIcon
                    variant='outline'
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title='Toggle color scheme'>
                    {dark ? <Sun size={18} /> : <MoonStars size={18} />}
                  </ActionIcon>
                </Grid.Col>
              </Grid>
            </Header>
          }
          styles={theme => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}>
          {/* <Chat></Chat> */}
          {/* Your application here */}
          <Board initialBoard={board} />
          <TaskCardFocus></TaskCardFocus>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
