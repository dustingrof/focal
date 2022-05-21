import React, { useContext, useEffect, useState } from 'react';
import { boardContext } from '../providers/boardProvider';
import { colourListContext } from '../providers/colourSchemeProvider';
import { useParams, useNavigate } from 'react-router-dom';
import '@asseinfo/react-kanban/dist/styles.css';
import { useWeather } from '../providers/weatherProvider'

import {
  Space,
  Box,
  AppShell,
  MantineProvider,
  ColorSchemeProvider,
  Avatar
} from '@mantine/core';

import TopHeader from './TopHeader';
import LeftNavbar from './LeftNavbar';



export default function BoardView(props) {
  const { colorScheme, setColorScheme } = useContext(colourListContext);
  const { weather } = useWeather();


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
          styles={theme => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}>
          {weather? 
            <Box 
              style={{ marginTop: 10, maxHeight:50, maxWidth:200 }}
              sx={(theme) => ({
                backgroundColor: theme.colors.gray[0],
                  '&:hover': {
                backgroundColor: theme.colors.gray[1],
                },
               })} >
              { weather.location.name} 
              {weather.location.region}
              <Avatar src={weather.current.condition.icon} alt="it's me" />
              {weather.current.condition.text}
              {weather.current.temp_c}
            </Box> : <div/>}

          <Space h='xl' />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
