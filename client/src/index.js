import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BoardProvider, { boardContext } from './providers/boardProvider';
import BoardListProvider from './providers/boardListProvider';


ReactDOM.render(
  <React.StrictMode>
      <BoardListProvider>
    <BoardProvider>
        <App />
    </BoardProvider>
      </BoardListProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
