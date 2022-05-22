import React, { useContext, useEffect, useState } from 'react';
import { boardContext } from '../providers/boardProvider';
import { colourListContext } from '../providers/colourSchemeProvider';
import { useParams, useNavigate } from 'react-router-dom';
import '@asseinfo/react-kanban/dist/styles.css';
import WeatherAPI from './WeatherAPI';

import {
  Space,
  Card,
  AppShell,
  MantineProvider,
  ColorSchemeProvider,
  Avatar,
} from '@mantine/core';

import TopHeader from './TopHeader';
import LeftNavbar from './LeftNavbar';

export default function BoardView(props) {
  const { colorScheme, setColorScheme } = useContext(colourListContext);

  const toggleColorScheme = ColorScheme =>
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}>
        <AppShell
          padding='md'
          navbar={<LeftNavbar />}
          header={<TopHeader />}
          // footer={  <WeatherAPI />}
          styles={theme => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}>
          <Space h='xl' />
          <WeatherAPI />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
