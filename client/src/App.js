import React from 'react'
import './App.css'

import '@asseinfo/react-kanban/dist/styles.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
// import {
//   Grid,
//   Space,
//   AppShell,
//   Navbar,
//   Header,
//   Text,
//   ActionIcon,
//   MantineProvider,
//   ColorSchemeProvider,
// } from '@mantine/core'
// import { Sun, MoonStars } from 'tabler-icons-react'

// import { useContext } from 'react'


// import Login from './components/Login'
import TaskCardFocus from './components/TaskCardFocus'
// import BoardCardFocus from './components/BoardCardFocus'
import BoardView from './components/BoardView'
// import NavBarAvatarList from './components/NavBarAvatarList'
// import NavBoardAvatar from './components/NavBarAvatar';
// import Timer from './components/Timer';
// import Pomodoro from './components/Pomodoro';
// import VideoChat from './components/VideoChat';
// import Chat from './components/Chat'

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
}

function App() {



  // const { content } = useContext(boardContext);

  // TODO move providers (mantine etc) to index.js

  return (
  <>
         {/* {TODO create board component, index} */}
      <Routes>
        {/* <Route index element={<Index />}/> */}
        <Route path="/boards/:board_id" element={<BoardView />} />
        <Route
          path="/boards/:board_id/tasks/:task_id"
          element={<TaskCardFocus />}
        />
        <Route path="*" element={<h2>Page not found!</h2>} />
        
      </Routes> 

  </>
  
  )
}

// {card}
// <button type="button" onClick={removeCard}>Remove Card</button>
// </MiniTaskCard>

export default App
