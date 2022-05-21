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

const initialBoardInfo = {
  name: '',
  description: '',
  imageUrl: '',
};

// Create a Component wrapper from Context.Provider
export default function BoardProvider(props) {




  // here is our shared state object
  const [boardInfo, setBoardInfo] = useState(initialBoardInfo);
  const [board, setBoard] = useState(initialBoardState);
  const [focusIsClosed, setFocusIsClosed] = useState(false);
  const [userAvatar, setUserAvatar] = useState();

  const { urlBoardId, setUrlBoardId } = useContext(UrlBoardIdContext);

  console.log('urlBoardId', urlBoardId);

  // useEffect(() => {
  //   console.log('board', board);
  // }, [board]);

  useEffect(() => {


    axios
      .get(`/boards/${urlBoardId}/tasks`)
      .then(results => {
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

        setBoard(prev => ({ ...prev, columns: incomingColumns }));
        // setBoard({ ...board, columns: incomingColumns });
      })
      .catch(error => {
        console.log(`Board cards: Request failed with error ${error}`);
      });


    axios
      .get(`/boards/${urlBoardId}`, { urlBoardId })
      .then(results => {




        // console.log('results.data[urlBoardId].name', results.data[urlBoardId].name);

        const name = results.data[urlBoardId].name;
        const description = results.data[urlBoardId].description;
        const image_url = results.data[urlBoardId].image_url;

        // console.log('newBoardInfo', newBoardInfo);

        const newBoardInfo = {
          name,
          description,
          image_url,
        };
        // console.log('newBoardInfo', newBoardInfo);

        setBoardInfo(newBoardInfo);

      })
      .catch(error => {
        console.log(`Board info: Request failed with error ${error}`);
      });







  }, [urlBoardId, focusIsClosed, setFocusIsClosed, setBoard, setBoardInfo]);

  // TODO replace board and task ID hardcoded values to be dynamic
  const onMoveCard = (_card, source, destination) => {
    const newColumnId = destination.toColumnId - 1;
    const newPositionId = destination.toPosition;

    const updatedBoard = moveCard(board, source, destination);
    updatedBoard.columns[newColumnId].cards[newPositionId].status =
      destination.toColumnId;

    const updatedCard = updatedBoard.columns[newColumnId].cards[newPositionId];

    const board_id = _card.board_id;
    console.log("UPDATED CARD EXAMPLE:", updatedCard);

    // TODO try removing strict mode and put setBoard within axios.then
    // optimistic state update before backend call
    setBoard(updatedBoard);

    // update backend
    // TODO add "/" before boards
    return axios
      .put(`/boards/${board_id}/tasks/${_card.id}`, { updatedCard })
      .then(results => { });
  };


  const onTaskDelete = taskToDelete => {
    const task_id = taskToDelete.task_id;
    const board_id = taskToDelete.board_id;
    setFocusIsClosed(true);
    return axios
      .delete(`/boards/${board_id}/tasks/${task_id}`, { task_id })
      .then(results => {
        // setUrlBoardId(board_id);
        setFocusIsClosed(false);
        setUrlBoardId(board_id);
      });
  };


  // const onBoardDelete = boardToDelete => {
  //   const board_id = boardToDelete.board_id;
  //   setFocusIsClosed(true);
  //   return axios
  //     .delete(`/boards/${board_id}`, { board_id })
  //     .then(results => {
  //       // setUrlBoardId(board_id);
  //       setFocusIsClosed(false);
  //       const moveToBoard = board_id - 1;
  //       setUrlBoardId(moveToBoard);

  //       // TODO re-direct to home page here?


  //     });
  // };


  const onFocusModalClose = updatedCard => {
    const card_id = updatedCard.id;
    const board_id = updatedCard.board_id;
    setFocusIsClosed(true);
    return axios
      .put(`/boards/${board_id}/tasks/${card_id}`, { updatedCard })
      .then(results => {
        setUrlBoardId(board_id);
        setFocusIsClosed(false);
      });
  };


  const onNewFocusModalClose = newCard => {
    const board_id = newCard.board_id;
    setFocusIsClosed(true);
    return axios
      .post(`/boards/${board_id}/tasks/new`, { newCard })
      .then(results => {
        setFocusIsClosed(false);
      });
  };





  const onBoardModalClose = (boardDataToUpdate) => {

    const board_id = Number(boardDataToUpdate.id);

    setFocusIsClosed(true);
    return axios
      .put(`/boards/${board_id}`, { boardDataToUpdate })
      .then(results => {
        setFocusIsClosed(false);

      })
      .catch(error => {
        console.log(`Request failed with error ${error}`);
      });

  };




  const providerData = { userAvatar, urlBoardId, setUrlBoardId, board, onMoveCard, onFocusModalClose, onNewFocusModalClose, onTaskDelete, boardInfo, onBoardModalClose };

  return (
    <boardContext.Provider value={providerData}>
      {props.children}
    </boardContext.Provider>
  );
}
