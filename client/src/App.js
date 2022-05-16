import './App.css'
import Board from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
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
  Sun,
  MoonStars,
  Button,
  MantineProvider,
} from '@mantine/core'
// import Pomodoro from './components/Pomodoro';
// import VideoChat from './components/VideoChat';
// import Chat from './components/Chat'
import Login from './components/Login'
import TaskCardFocus from './components/TaskCardFocus'
import BoardCardFocus from './components/BoardCardFocus'
import MiniTaskCard from './components/MiniTaskCard'
import NavBoardAvatar from './components/NavBarAvatar'
import NavBarAvatarList from './components/NavBarAvatarList'

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
}
//Testing nav bar

const boards = {
  1: {
    id: 1,
    name:
      'nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia',
    description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
    image_url: 'https://robohash.org/sedeumdolores.png?size=250x250&set=set1',
    created_at: '2021-08-02T07:00:00.000Z',
    active: true,
  },
  2: {
    id: 2,
    name:
      'faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
    image_url: 'https://robohash.org/isteetminima.png?size=250x250&set=set1',
    created_at: '2021-06-15T07:00:00.000Z',
    active: true,
  },
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
        colors: {
          // override dark colors to change them for all components
          dark: [
            '#d5d7e0',
            '#acaebf',
            '#8c8fa3',
            '#666980',
            '#4d4f66',
            '#34354a',
            '#2b2c3d',
            '#1d1e30',
            '#0c0d21',
            '#01010a',
          ],
        },
      }}
    >
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 'auto' }} p="xs">
            {/* Navbar content */}

            <Navbar.Section grow mt="md">
              <NavBarAvatarList boards={boards} />
            </Navbar.Section>
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
              <Grid.Col span={3}>
                <Login></Login>
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
        {/* <Chat></Chat> */}
        {/* Your application here */}
        {/* <Board
          initialBoard={board}
          renderCard={({ content }, { removeCard, dragging }) => (
            <MiniTaskCard dragging={dragging}>
              {content}
              <button type="button" onClick={removeCard}>
                Remove Card
              </button>
            </MiniTaskCard>
          )}
        ></Board>
        <TaskCardFocus></TaskCardFocus>
        <Space h="xl" />
        <BoardCardFocus></BoardCardFocus> */}
      </AppShell>
    </MantineProvider>
  )
}

export default App
