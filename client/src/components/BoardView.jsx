import React, { useContext, useEffect } from 'react';
import MiniTaskCard from './MiniTaskCard';
import NewTaskCardFocus from './NewTaskCardFocus';
import Board, { addCard, YourColumnHeader } from '@asseinfo/react-kanban';
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
  Grid,
  Stack,
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

export default function BoardView(props) {
  // const navigate = useNavigate();

  const params = useParams();
  // console.log('THESE PARAMS', params);

  const { board, onMoveCard, setUrlBoardId, boardInfo } =
    useContext(boardContext);

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
              // backgroundImage: `url(${boardInfo.image_url})`,
              // backgroundSize: 'cover',
            },
          })}>
          {/* Your application here */}

          {/* <Title order={1}>{boardInfo['name']}</Title> */}
          {/* <Text size='md'>{boardInfo['description']}</Text> */}
          <Grid align='flex-start' style={{ marginTop: 7 }}>
            <Grid.Col
              span={12}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <BoardCardFocus props={boardInfo}>
                {boardInfo.name}
              </BoardCardFocus>
              <NewTaskCardFocus />
            </Grid.Col>

            {/* <Grid.Col span={2}> */}
            {/* <Text size='xl' style={{ fontWeight: 700 }}>
              {boardInfo['name']}
              </Text> */}
            {/* </Grid.Col> */}
          </Grid>

          <Space h='lg' />

          <Board
            onCardDragEnd={onMoveCard}
            disableColumnDrag
            allowAddCard={{ on: 'top' }}
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
