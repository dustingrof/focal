import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BoardProvider from './providers/boardProvider';
import BoardListProvider from './providers/boardListProvider';
import UrlProvider from './providers/UrlBoardIdProvider';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from 'react-router-dom';

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
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import ColourSchemeProvider from './providers/colourSchemeProvider';
import TimerProvider from './providers/timerProvider';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UrlProvider>
        <ColourSchemeProvider>
          <TimerProvider>
            <NotificationsProvider position='bottom-left' limit={1}>
              <BoardListProvider>
                <BoardProvider>
                  <App />
                </BoardProvider>
              </BoardListProvider>
            </NotificationsProvider>
          </TimerProvider>
        </ColourSchemeProvider>
      </UrlProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
