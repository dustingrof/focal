import React, { useContext } from 'react'
import MiniTaskCard from './MiniTaskCard'
import Board from '@asseinfo/react-kanban'
import { boardContext } from '../providers/boardProvider'
import { useLocalStorage } from '@mantine/hooks'

import '@asseinfo/react-kanban/dist/styles.css'

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
} from '@mantine/core'
import { Sun, MoonStars } from 'tabler-icons-react'

import Login from './Login'

import BoardCardFocus from './BoardCardFocus'
import NavBarAvatarList from './NavBarAvatarList'
// import NavBoardAvatar from './NavBarAvatar';
// import Timer from './Timer';
// import Pomodoro from './Pomodoro';
// import VideoChat from './VideoChat';
import Chat from './Chat'

export default function BoardView() {
  const { board, onMoveCard } = useContext(boardContext)

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const dark = colorScheme === 'dark'

  const toggleColorScheme = (ColorScheme) =>
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <AppShell
          padding="md"
          navbar={
            <Navbar width={{ base: 'auto' }} p="xs">
              <Navbar.Section grow mt="md">
                <NavBarAvatarList />
              </Navbar.Section>
              {/* <Pomodoro /> */}
              {/* <Timer /> */}
              <Navbar.Section>footer{/* Footer with user */}</Navbar.Section>
            </Navbar>
          }
          header={
            <Header height={60} p="xs">
              <Grid justify="space-between">
                <Grid.Col span={3}>
                  <Text
                    component="span"
                    align="center"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    size={'xl'}
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif' }}
                  >
                    focal
                  </Text>
                </Grid.Col>
                <Grid.Col span={5}>
                  <Login></Login>
                </Grid.Col>
                <Grid.Col span={2}>
                  <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                  >
                    {dark ? <Sun size={18} /> : <MoonStars size={18} />}
                  </ActionIcon>
                </Grid.Col>
              </Grid>
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          {/* Your application here */}
          <Board
            onCardDragEnd={onMoveCard}
            disableColumnDrag
            renderCard={(cardData, { dragging }) => {
              // console.log('arguments:', arguments)
              // console.log('content:', cardData)
              return (
                <MiniTaskCard dragging={dragging} cardData={{ ...cardData }}>
                  
                </MiniTaskCard>
              )
            }}
          >
            {board}
          </Board>
            <Chat />
          <Space h="xl" />
          <BoardCardFocus></BoardCardFocus>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
