import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create a context
export const boardListContext = createContext();
export const useBoardList = () => useContext(boardListContext);

// Create a Component wrapper from Context.Provider
export default function BoardListProvider(props) {
  // here is our shared state object
  const [boardList, setBoardList] = useState({});
  const [focusIsClosed, setFocusIsClosed] = useState(false);
  const [listOfUsers, setListOfUsers] = useState();

  // If statement checks if object has been rendered yet

  useEffect(() => {
    axios.get('/boards/').then(results => {
      const listOfBoards = results.data;
      setBoardList(listOfBoards);
    });
    axios.get('/users/').then(results => {
      // const something = Object.values(results.data);
      // console.log('something', something);
      setListOfUsers(Object.values(results.data));
    });
  }, []);



  const onBoardDelete = boardToDelete => {
    const board_id = boardToDelete.board_id;
    setFocusIsClosed(true);
    return axios.delete(`/boards/${board_id}`, { board_id }).then(results => {
      // setUrlBoardId(board_id);
      setFocusIsClosed(false);
      // const moveToBoard = board_id - 1;
      // setUrlBoardId(moveToBoard);

      // TODO re-direct to home page here?
    });
  };

  const onNewBoard = boardToAdd => {
    setFocusIsClosed(true);

    return axios.post(`/boards/new`, { boardToAdd }).then(results => {
      setFocusIsClosed(false);
    });
  };

  const providerData = {
    onBoardDelete,
    boardList,
    onNewBoard,
    setBoardList,
    listOfUsers,
    setListOfUsers,
  };
  // const providerData = { boardList };

  return (
    <boardListContext.Provider value={providerData}>
      {props.children}
    </boardListContext.Provider>
  );
}
