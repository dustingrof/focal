import React, { useContext, useEffect } from 'react';
import MiniTaskCard from './MiniTaskCard';
import Board from '@asseinfo/react-kanban';
import { boardContext } from '../providers/boardProvider';
import { colourListContext } from '../providers/colourSchemeProvider';
import { useParams, useNavigate } from 'react-router-dom';
import '@asseinfo/react-kanban/dist/styles.css';

import {
  Text,
  Space,
  AppShell,
  Title,
  MantineProvider,
  ColorSchemeProvider,
} from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

import Login from './TopHeader/Login';
import TaskCardFocus from './TaskCardFocus';
import BoardCardFocus from './BoardCardFocus';

// import Timer from './Timer';
// import Pomodoro from './Pomodoro';
// import VideoChat from './VideoChat';
import Chat from './TopHeader/Chat';
import TopHeader from './TopHeader';
import LeftNavbar from './LeftNavbar';

export default function BoardView() {
  // const navigate = useNavigate();

  const params = useParams();
  // console.log('THESE PARAMS', params);

  const { board, onMoveCard, setUrlBoardId } = useContext(boardContext);

  useEffect(() => {
    setUrlBoardId(params.board_id);
  }, [setUrlBoardId, params.board_id]);

  // console.log('Board State <<<<<<<', board);
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
          styles={theme => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}>
          {/* Your application here */}
          <Title order={1}>Board Title Here</Title>
          <Text size='md'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            lobortis velit sit amet orci posuere consectetur. Fusce lorem nisi,
            porttitor et diam accumsan, dictum gravida odio. Donec ultricies
            finibus nibh non gravida.{' '}
          </Text>
          <BoardCardFocus></BoardCardFocus>
          <Space h='lg' />
          <Board
            onCardDragEnd={onMoveCard}
            disableColumnDrag
            renderCard={(cardData, { dragging }) => {
              // console.log('arguments:', arguments)
              // console.log('content:', cardData);
              return (
                <MiniTaskCard dragging={dragging} cardData={{ ...cardData }} />
              );
            }}>
            {board}
          </Board>
          <Space h='xl' />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
