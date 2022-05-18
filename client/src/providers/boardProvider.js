import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { moveCard } from '@asseinfo/react-kanban';
import { useParams, useNavigate } from 'react-router-dom';
import { UrlBoardIdContext } from './UrlBoardIdProvider';

// Create a context
export const boardContext = createContext();
export const useBoard = () => useContext(boardContext);

const initialBoardState = {
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
};

// Create a Component wrapper from Context.Provider
export default function BoardProvider(props) {
  // here is our shared state object
  const [board, setBoard] = useState(initialBoardState);
  const { urlBoardId, setUrlBoardId } = useContext(UrlBoardIdContext);
  // console.log('urlBoardId', urlBoardId);

  // console.log("board:", board);
  // console.log('when is this called');
  useEffect(() => {
    axios.get(`/boards/${urlBoardId}/tasks`).then(results => {
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

      // TODO update to use if/else-if

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

      // TODO initial board has no cards, could remove prev usage

      setBoard(prev => ({ ...prev, columns: incomingColumns }));
    });
  }, [setUrlBoardId]);

  // TODO replace board and task ID hardcoded values to be dynamic
  const onMoveCard = (_card, source, destination) => {
    const newColumnId = destination.toColumnId - 1;
    const newPositionId = destination.toPosition;

    const updatedBoard = moveCard(board, source, destination);
    updatedBoard.columns[newColumnId].cards[newPositionId].status =
      destination.toColumnId;

    const updatedCard = updatedBoard.columns[newColumnId].cards[newPositionId];


    // console.log("UPDATED CARD EXAMPLE:", updatedCard);


    // TODO try removing strict mode and put setBoard within axios.then
    // optimistic state update before backend call
    setBoard(updatedBoard);

    // update backend
    // TODO add "/" before boards
    return axios
      .put(`/boards/1/tasks/${_card.id}`, { updatedCard })
      .then(results => { });
  };

  const onFocusModalClose = (updatedCard) => {

    // deconstruct updatedCard here
    // use new values to create updatedCard
    // perform axios put with updatedCard like below

    console.log("updatedCard:", updatedCard);

    const card_id = updatedCard.id;

    return axios
      .put(`/boards/1/tasks/${card_id}`, { updatedCard })
      .then(results => { });
  };


  const providerData = { board, onMoveCard, onFocusModalClose  };

  return (
    <boardContext.Provider value={providerData}>
      {props.children}
    </boardContext.Provider>
  );
}
