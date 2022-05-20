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
  const [userAvatar, setUserAvatar] = useState();

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
  }, [urlBoardId, focusIsClosed, setFocusIsClosed, setBoard ]);

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
    return axios
      .delete(`/boards/${board_id}/tasks/${task_id}`, { task_id })
      .then(results => {
        // setUrlBoardId(board_id);
        setUrlBoardId(board_id);
        setFocusIsClosed(true);
      });
  };



  const onBoardDelete = boardToDelete => {
    const board_id = boardToDelete.board_id;
    return axios
      .delete(`/boards/${board_id}`, { board_id })
      .then(results => {
        // setUrlBoardId(board_id);
        setUrlBoardId(board_id);
        setFocusIsClosed(true);
      });
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
    const board_id = newCard.board_id;
    return axios
      .post(`/boards/${board_id}/tasks/new`, { newCard })
      .then(results => {
        setFocusIsClosed(true);
      });
  };


  const onNewBoard = boardToAdd => {
    return axios
      .post(`/boards/new`, { boardToAdd })
      .then(results => {
        console.log(results);
        // setUrlBoardId(boardToAdd);
        setFocusIsClosed(true);
      });
  };


  const onUserAvatar = (user) => {

    let avatar = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2zIMQkX0ve8QO5B5Hk8TC8&ust=1653112270774000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMDktJ-x7fcCFQAAAAAdAAAAABAD";

    switch (user) {
      case "Dustin":
        avatar = "https://media-exp1.licdn.com/dms/image/C5603AQG9TyKFm-53iw/profile-displayphoto-shrink_800_800/0/1646679014931?e=1658361600&v=beta&t=RwhvswjhtXKHoO_UIjWTi84w2qmp6zBFNai3HVmU8Bw";
        break;
      case "Nicole":
        avatar = "https://media-exp1.licdn.com/dms/image/C5603AQEUSRGk43oeGA/profile-displayphoto-shrink_800_800/0/1652991046562?e=1658361600&v=beta&t=ORJ1H2_Qk_V8_xJe3w6ia0mfAYo4mdg8TxLaWuRrt5g";
        break;
      case "Iaan":
        avatar = "https://media-exp1.licdn.com/dms/image/C5603AQHwuNX81FzwEQ/profile-displayphoto-shrink_400_400/0/1646859896622?e=1658361600&v=beta&t=nioiZ7kph-nU2N1P97Y7xTeZXJl9OAqUSi0esu6SMu0";
        break;
      default:
        avatar = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2zIMQkX0ve8QO5B5Hk8TC8&ust=1653112270774000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMDktJ-x7fcCFQAAAAAdAAAAABAD";
    }

    setUserAvatar(avatar);



  };


  const providerData = { userAvatar, urlBoardId, setUrlBoardId, board, onMoveCard, onFocusModalClose, onNewFocusModalClose, onTaskDelete, onNewBoard, onUserAvatar, onBoardDelete };

  return (
    <boardContext.Provider value={providerData}>
      {props.children}
    </boardContext.Provider>
  );
}
