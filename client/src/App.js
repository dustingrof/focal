import logo from './logo.svg';
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
  Sun,
  MoonStars,
  Button,
  MantineProvider,
} from '@mantine/core';
// import Pomodoro from './components/Pomodoro';
// import VideoChat from './components/VideoChat';
import Chat from './components/Chat'
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
      }}>
      <AppShell
        padding='md'
        navbar={
          <Navbar width={{ base: 300 }} p='xs'>
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
            <Login></Login>
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
  );
}

export default App;
