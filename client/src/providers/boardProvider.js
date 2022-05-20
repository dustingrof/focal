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
  const [focusIsClosed, setFocusIsClosed] = useState(false);

  const { urlBoardId, setUrlBoardId } = useContext(UrlBoardIdContext);
  // console.log('urlBoardId', urlBoardId);

  // console.log("board:", board);
  // console.log('when is this called');
  console.log('urlBoardId', urlBoardId);

  // useEffect(() => {
  //   console.log('board', board);
  // }, [board]);

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
  }, [urlBoardId, focusIsClosed]);

  // TODO replace board and task ID hardcoded values to be dynamic
  const onMoveCard = (_card, source, destination) => {
    const newColumnId = destination.toColumnId - 1;
    const newPositionId = destination.toPosition;

    const updatedBoard = moveCard(board, source, destination);
    updatedBoard.columns[newColumnId].cards[newPositionId].status =
      destination.toColumnId;

    const updatedCard = updatedBoard.columns[newColumnId].cards[newPositionId];

    const board_id = _card.board_id;
    // console.log("UPDATED CARD EXAMPLE:", updatedCard);

    // TODO try removing strict mode and put setBoard within axios.then
    // optimistic state update before backend call
    setBoard(updatedBoard);

    // update backend
    // TODO add "/" before boards
    return axios
      .put(`/boards/${board_id}/tasks/${_card.id}`, { updatedCard })
      .then(results => { });
  };

  const onFocusModalClose = updatedCard => {
    
    
    const card_id = updatedCard.id;

    const board_id = updatedCard.board_id;

    return axios
      .put(`/boards/${board_id}/tasks/${card_id}`, { updatedCard })
      .then(results => {
        setUrlBoardId(board_id);
        setFocusIsClosed(true);
      });
  };


  const onNewFocusModalClose = newCard => {


    // console.log("made it to axios call function");
    // console.log("newCard:", newCard);

    // const card_id = newCard.id; // don't need this, new ID should be assigned in DB

    const board_id = newCard.board_id;

    return axios
      .post(`/boards/${board_id}/tasks/new`, { newCard })
      .then(results => {
        // setUrlBoardId(board_id);
        setFocusIsClosed(true);
      });
  };

  const providerData = { urlBoardId, setUrlBoardId, board, onMoveCard, onFocusModalClose, onNewFocusModalClose };

  return (
    <boardContext.Provider value={providerData}>
      {props.children}
    </boardContext.Provider>
  );
}
