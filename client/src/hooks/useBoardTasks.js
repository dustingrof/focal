import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBoardTasks = () => {
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

  const onMoveCard = board => {
    // post call first
    
    setBoard(board);
  };

  useEffect(() => {
    axios.get('/boards/1/tasks').then(results => {
    

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

  

      setBoard(prev => ({ ...prev, columns: incomingColumns }));
    });
  }, []);

  return {
    board,
    onMoveCard,
  };
};
