import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context
export const boardContext = createContext();

// Create a Component wrapper from Context.Provider
export default function BoardProvider(props) {
  // here is our shared state object
  const [board, setBoard] = useState({
    columns: [
      {
        id: 1,
        title: 'Backlog',
        cards: [],
      },
      {
        id: 2,
        title: 'Doing',
        cards: [],
      },
      {
        id: 3,
        title: 'Pending',
        cards: [],
      },
      {
        id: 4,
        title: 'Complete',
        cards: [],
      },
    ],
  });

  useEffect(() => {
    console.log('anything');
    axios.get('boards/1/tasks').then(results => {
      console.log('results:', results);

      const incomingColumns = [
        {
          id: 1,
          title: 'Backlog',
          cards: [],
        },
        {
          id: 2,
          title: 'Doing',
          cards: [],
        },
        {
          id: 3,
          title: 'Pending',
          cards: [],
        },
        {
          id: 4,
          title: 'Complete',
          cards: [],
        },
      ];

      for (const result in results.data) {
        if (results.data[result].status === 1) {
          incomingColumns[0].cards.push(results.data[result]);
        }
        if (results.data[result].status === 2) {
          incomingColumns[1].cards.push(results.data[result]);
        }
        if (results.data[result].status === 3) {
          incomingColumns[2].cards.push(results.data[result]);
        }
        if (results.data[result].status === 4) {
          incomingColumns[3].cards.push(results.data[result]);
        }
      }

      console.log('incomingColumns:', incomingColumns);

      setBoard(prev => ({ ...prev, columns: incomingColumns }));
    });
  }, []);

  const onMoveCard = board => {
    // post call first
    console.log('onMoveCard has been called');
    setBoard(board);
  };
  // all components in this tree will have access to the board context

  // const providerData = { board, onMoveCard };
  const providerData = { board, onMoveCard };

  // console.log("3h?")


  return (
    <boardContext.Provider value={providerData}>
      {props.children}
    </boardContext.Provider>
  );
}
