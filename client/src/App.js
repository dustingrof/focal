import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Board, { moveCard } from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import {
  Grid,
  Space,
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
} from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

// import Pomodoro from './components/Pomodoro';
// import VideoChat from './components/VideoChat';
// import Chat from './components/Chat';
import Login from './components/Login';
import TaskCardFocus from './components/TaskCardFocus';
import BoardCardFocus from './components/BoardCardFocus';
import MiniTaskCard from './components/MiniTaskCard';
// import NavBoardAvatar from './components/NavBarAvatar';
import NavBarAvatarList from './components/NavBarAvatarList';
// import { useBoardTasks } from './hooks/useBoardTasks';
import { useContext } from 'react';
import Timer from './components/Timer';
import BoardProvider, { boardContext } from './providers/boardProvider';

// const board = {
//   columns: [
//     {
//       id: 1,
//       title: 'Backlog',
//       cards: [{}, {}, {}],
//     },
//     {
//       id: 2,
//       title: 'Doing',
//       cards: [
//         {
//           id: 2,
//           title: 'Drag-n-drop support',
//           description: 'Move a card between the columns',
//         },
//       ],
//     },
//     {
//       id: 3,
//       title: 'Pending',
//       cards: [
//         {
//           id: 3,
//           title: 'Drag-n-drop support',
//           description: 'Move a card between the columns',
//         },
//       ],
//     },
//     {
//       id: 4,
//       title: 'Complete',
//       cards: [
//         {
//           id: 4,
//           title: 'Drag-n-drop support',
//           description: 'Move a card between the columns',
//         },
//       ],
//     },
//   ],
// };

const boards = {
  1: {
    id: 1,
    name: 'BOARD 1',
    description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    image_url: 'https://robohash.org/sedeumdolores.png?size=250x250&set=set1',
    created_at: '2021-08-02T07:00:00.000Z',
    active: true,
  },
  2: {
    id: 2,
    name: 'BOARD 2',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    image_url: 'https://robohash.org/isteetminima.png?size=250x250&set=set1',
    created_at: '2021-06-15T07:00:00.000Z',
    active: true,
  },
};

function App() {
  // console.log("state:", state);

  // const [stateChange, setStateChange] = useState({
  //   columns: [
  //     {
  //       id: 1,
  //       title: "Backlog",
  //       cards: []
  //     },
  //     {
  //       id: 2,
  //       title: "Doing",
  //       cards: []
  //     },
  //     {
  //       id: 3,
  //       title: "Pending",
  //       cards: []
  //     },
  //     {
  //       id: 4,
  //       title: "Complete",
  //       cards: []
  //     },
  //   ]
  // });

  // const { board, onMoveCard } = useBoardTasks();
  // const { board } = useBoardTasks();

  // console.log("state from useBoardTasks:", state);

  // useEffect(() => {
  //   console.log("state before setStateChange:", state);
  //   setStateChange(state);
  // }, [state]);
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const dark = colorScheme === 'dark';
  const toggleColorScheme = ColorScheme =>
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  const { board, onMoveCard } = useContext(boardContext);

  // console.log("board:",board);
  // console.log("onMoveCard:",onMoveCard);

  // const onMoveCard = useContext(boardContext);

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
          navbar={
            <Navbar width={{ base: 'auto' }} p='xs'>
              {/* Navbar content */}

              <Navbar.Section grow mt='md'>
                <NavBarAvatarList boards={boards} />
              </Navbar.Section>
              {/* <Pomodoro /> */}
              {/* <Timer /> */}

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
                <Grid.Col span={5}>
                  <Login></Login>
                </Grid.Col>
                <Grid.Col span={2}>
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
          <Board
            moveCard={(board, source, destination) => {
              
            }}
            onCardDragEnd={(source, destination) => {
              console.log("source:", source);
              console.log("destination:", destination);
              console.log("board:", board);

              // get to here before error
              // const updatedBoard = moveCard(board, source, destination);
              // moveCard= {
              //   (board, source, destination) => (console.log("print?"))
              // };

              
              // onMoveCard(updatedBoard);




          // console.log("updatedBoard:", updatedBoard);
          console.log("does this happen when card is dropped?")
            }}
          renderCard={({ content }, { removeCard, dragging }) => (
            <MiniTaskCard dragging={dragging}>
              {content}
              <button type='button' onClick={removeCard}>
                Remove Card
              </button>
            </MiniTaskCard>
          )}
            disableColumnDrag>
          {board}
        </Board>

        <TaskCardFocus></TaskCardFocus>
        <Space h='xl' />
        <BoardCardFocus></BoardCardFocus>
      </AppShell>
    </MantineProvider>
    </ColorSchemeProvider >

  );
}

export default App;
